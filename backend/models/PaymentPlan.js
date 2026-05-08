const mongoose = require('mongoose');

const paymentPlanSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  planType: {
    type: Number,
    enum: [3, 6, 12],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'defaulted'],
    default: 'active',
  },
  installments: [{
    installmentNumber: {
      type: Number,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'paid', 'overdue'],
      default: 'scheduled',
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model('PaymentPlan', paymentPlanSchema);
