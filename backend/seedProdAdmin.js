const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('DB Connected - Creating custom App Admin...');
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password', salt);

    // Delete existing admin if exists to avoid conflicts
    await User.deleteOne({ email: 'admin' });

    // Create custom admin
    await User.create({
      name: 'System Admin',
      email: 'admin',
      passwordHash: hash,
      role: 'system_admin'
    });

    console.log('Success! The App Admin username is now "admin" and the password is "password"');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}).catch(err => console.log(err));
