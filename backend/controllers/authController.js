const User = require('../models/User');
const Wallet = require('../models/Wallet');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, cnic, role, age } = req.body;

    if (!password || password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters long');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash,
      cnic,
      role: ['parent', 'student', 'school_admin'].includes(role) ? role : 'parent',
    });

    // Automatically create a Wallet document linked to this User with 50000 sign-up bonus
    const wallet = await Wallet.create({
      userId: user._id,
      balance: 50000,
      totalDeposits: 50000,
      currency: 'PKR',
    });

    // Create a transaction record for the initial deposit
    const Transaction = require('../models/Transaction');
    await Transaction.create({
      transactionId: `TXN-DEP-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      type: 'deposit',
      amount: 50000,
      status: 'successful',
      senderId: user._id,
      receiverId: user._id,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    if (user.status === 'blocked') {
      res.status(403);
      throw new Error('User is blocked');
    }

    // Update lastLogin
    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.cnic) user.cnic = req.body.cnic;

      const updatedUser = await user.save();
      res.status(200).json({ success: true, data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      }});
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const isMatch = await bcrypt.compare(req.body.oldPassword, user.passwordHash);
      if (!isMatch) {
        res.status(401);
        throw new Error('Incorrect current password');
      }

      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(req.body.newPassword, salt);
      await user.save();

      res.status(200).json({ success: true, message: 'Password updated successfully' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
