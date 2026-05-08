const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    unique: true,
    sparse: true, // Allow multiple null/undefined values if not provided for school admins
  },
  role: {
    type: String,
    enum: ['parent', 'school_admin', 'system_admin', 'student'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  lastLogin: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
