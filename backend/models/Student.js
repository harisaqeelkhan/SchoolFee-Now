const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  studentIdString: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
