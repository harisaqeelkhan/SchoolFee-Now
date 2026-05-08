const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  studentId: { type: String, required: true }, // Internal School ID
  fullName: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Linked parent
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
