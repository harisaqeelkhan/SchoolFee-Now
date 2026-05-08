const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Student = require('../models/Student');
const { createNotification } = require('./notificationController');

exports.getUsers = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    let query = { role: 'parent' };

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { cnic: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(query)
      .select('-passwordHash')
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await User.countDocuments(query);

    res.status(200).json({ 
      success: true, 
      count: users.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: users 
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ success: true, data: user });
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
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const wallets = await Wallet.find()
      .populate('userId', 'name email')
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Wallet.countDocuments();
    
    res.status(200).json({ 
      success: true, 
      count: wallets.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: wallets 
    });
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
    const { type, status, startDate, endDate, category, search, suspiciousFlag, page = 1, limit = 20 } = req.query;
    
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

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const transactions = await Transaction.find(query)
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({ 
      success: true, 
      count: transactions.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: transactions 
    });
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
    
    const volumeAgg = await Transaction.aggregate([
      { $match: { status: 'successful' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const transactionVolume = volumeAgg[0]?.total || 0;

    const balanceAgg = await Wallet.aggregate([
      { $group: { _id: null, total: { $sum: "$balance" } } }
    ]);
    const totalDemoBalance = balanceAgg[0]?.total || 0;

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

exports.getTransactionVolume = async (req, res, next) => {
  try {
    const volumeAgg = await Transaction.aggregate([
      { $match: { status: 'successful' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    res.status(200).json({ success: true, data: { transactionVolume: volumeAgg[0]?.total || 0 } });
  } catch (error) {
    next(error);
  }
};

exports.getSystemBalance = async (req, res, next) => {
  try {
    const balanceAgg = await Wallet.aggregate([
      { $group: { _id: null, total: { $sum: "$balance" } } }
    ]);
    res.status(200).json({ success: true, data: { systemBalance: balanceAgg[0]?.total || 0 } });
  } catch (error) {
    next(error);
  }
};

exports.registerStudent = async (req, res, next) => {
  try {
    const { schoolId, studentId, fullName } = req.body;
    
    if (!schoolId || !studentId || !fullName) {
      res.status(400);
      throw new Error('Please provide schoolId, studentId, and fullName');
    }

    const studentExists = await Student.findOne({ studentId });
    if (studentExists) {
      res.status(400);
      throw new Error('Student ID already registered');
    }

    const student = await Student.create({
      schoolId,
      studentId,
      fullName
    });

    res.status(201).json({ success: true, data: student, message: 'Student registered successfully' });
  } catch (error) {
    next(error);
  }
};
