const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: String,
    required: true, // Format: "YYYY-MM"
  },
  totalLimit: {
    type: Number,
    required: true,
    min: 0.01, // Must validate > 0
  },
  categoryLimits: [{
    category: {
      type: String,
    },
    limit: {
      type: Number,
    },
  }],
  spentAmount: {
    type: Number,
    default: 0,
  },
  warningThreshold: {
    type: Number,
    default: 80, // Percentage at which to warn
  },
  status: {
    type: String,
    enum: ['safe', 'nearLimit', 'exceeded'],
    default: 'safe',
  },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
