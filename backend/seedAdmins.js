const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Student = require('./models/Student');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('DB Connected');
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password123', salt);

    // 1. Create System Admin
    await User.create({
      name: 'Master System Admin',
      email: 'system@schoolfee.com',
      passwordHash: hash,
      role: 'system_admin'
    });

    // 2. Create School Admin
    await User.create({
      name: 'Beaconhouse Admin',
      email: 'admin@beaconhouse.edu.pk',
      passwordHash: hash,
      role: 'school_admin'
    });

    // 3. Create Student Login
    const studentUser = await User.create({
      name: 'Ahmed Ali (Student Portal)',
      email: 'student@schoolfee.com',
      passwordHash: hash,
      role: 'student'
    });

    // Link student login to actual student record
    await Student.findOneAndUpdate({ studentId: 'STU-12345' }, { parentId: studentUser._id });

    console.log('Successfully created System Admin, School Admin, and Student portals!');
    console.log('All passwords are: password123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}).catch(err => console.log(err));
