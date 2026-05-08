const mongoose = require('mongoose');

const paymentPlanSchema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  originalFee: { type: Number, required: true },
  totalRepayment: { type: Number, required: true },
  status: { type: String, enum: ['active', 'completed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('PaymentPlan', paymentPlanSchema);
