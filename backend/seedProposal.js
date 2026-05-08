const mongoose = require('mongoose');
const dotenv = require('dotenv');
const School = require('./models/School');
const Student = require('./models/Student');
const FeeStructure = require('./models/FeeStructure');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch(err => console.log(err));

const seedData = async () => {
  try {
    // Clear old data
    await School.deleteMany();
    await Student.deleteMany();
    await FeeStructure.deleteMany();

    // Create School
    const school = await School.create({
      name: 'Beaconhouse School System',
      registrationNo: 'REG-BSS-101',
      bankAccount: 'PK12HABG0000123456789',
      mdrRate: 2.5
    });

    // Create a mock Student
    const student = await Student.create({
      schoolId: school._id,
      studentId: 'STU-12345',
      fullName: 'Ahmed Ali'
    });

    // Create Fee Structures
    await FeeStructure.create([
      { schoolId: school._id, grade: 'Grade 8', amount: 45000, dueDate: new Date('2026-06-01') },
      { schoolId: school._id, grade: 'Grade 9', amount: 55000, dueDate: new Date('2026-06-01') },
      { schoolId: school._id, grade: 'Grade 10', amount: 65000, dueDate: new Date('2026-06-01') }
    ]);

    console.log('Successfully seeded School, Student, and Fee Structure data!');
    console.log('You can now test the BNPL flow using Student ID: STU-12345');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
