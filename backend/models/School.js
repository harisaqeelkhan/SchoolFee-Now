const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNo: { type: String, required: true, unique: true },
  bankAccount: { type: String, required: true },
  mdrRate: { type: Number, required: true, default: 2.5 }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
