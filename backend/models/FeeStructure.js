const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  grade: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FeeStructure', feeStructureSchema);
