const express = require('express');
const router = express.Router();
const User = require('../models/User');
const School = require('../models/School');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password', salt);

    // Delete existing admin if exists to avoid conflicts
    await User.deleteOne({ email: 'admin' });

    // Create custom App Admin
    await User.create({
      name: 'System Admin (Testing)',
      email: 'admin',
      passwordHash: hash,
      role: 'system_admin'
    });

    // Also seed the default school so BNPL works!
    const schoolExists = await School.findOne({ registrationNo: 'REG-BSS-101' });
    if (!schoolExists) {
      await School.create({
        name: 'Beaconhouse School System',
        registrationNo: 'REG-BSS-101',
        bankAccount: 'PK12HABG0000123456789',
        mdrRate: 2.5
      });
    }

    res.json({ success: true, message: 'Cloud database seeded successfully! You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
