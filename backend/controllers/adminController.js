const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const { createNotification } = require('./notificationController');

exports.getUsers = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    let query = { role: 'parent' };

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { cnic: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).select('-passwordHash');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.toggleUserBlock = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();

    if (user.status === 'blocked') {
      await createNotification(user._id, 'Account Blocked', 'Your account has been temporarily restricted by an admin.', 'account');
    } else {
      await createNotification(user._id, 'Account Unblocked', 'Your account has been reactivated.', 'account');
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.getWallets = async (req, res, next) => {
  try {
    const wallets = await Wallet.find().populate('userId', 'name email');
    res.status(200).json({ success: true, data: wallets });
  } catch (error) {
    next(error);
  }
};

exports.getFlaggedTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ suspiciousFlag: true })
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email');
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const { type, status, startDate, endDate, category, search, suspiciousFlag } = req.query;
    
    let query = {};

    if (type) query.type = type;
    if (status) query.status = status;
    if (category) query.category = category;
    if (suspiciousFlag) query.suspiciousFlag = suspiciousFlag === 'true';
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { transactionId: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const transactions = await Transaction.find(query)
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardData = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'parent' });
    const activeUsers = await User.countDocuments({ role: 'parent', status: 'active' });
    const blockedUsers = await User.countDocuments({ role: 'parent', status: 'blocked' });
    
    const totalTransactions = await Transaction.countDocuments();
    const flaggedTransactions = await Transaction.countDocuments({ suspiciousFlag: true });
    
    // Calculate transaction volume
    const allTxns = await Transaction.find({ status: 'successful' });
    const transactionVolume = allTxns.reduce((acc, curr) => acc + curr.amount, 0);

    const wallets = await Wallet.find();
    const totalDemoBalance = wallets.reduce((acc, curr) => acc + curr.balance, 0);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        blockedUsers,
        totalTransactions,
        flaggedTransactions,
        transactionVolume,
        totalDemoBalance
      }
    });
  } catch (error) {
    next(error);
  }
};
