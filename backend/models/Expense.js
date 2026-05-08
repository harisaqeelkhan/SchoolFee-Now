const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01, // Must validate > 0
  },
  category: {
    type: mongoose.Schema.Types.Mixed, // Can be String or ObjectId (ref: 'Category')
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
