const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentPlan', required: true },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['scheduled', 'paid', 'overdue'], default: 'scheduled' }
}, { timestamps: true });

module.exports = mongoose.model('Installment', installmentSchema);
