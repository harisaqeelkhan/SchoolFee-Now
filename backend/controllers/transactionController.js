const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res, next) => {
  try {
    const { type, status, startDate, endDate, category, search, page = 1, limit = 20 } = req.query;
    
    let query = {
      $or: [
        { senderId: req.user._id },
        { receiverId: req.user._id }
      ]
    };

    if (type) query.type = type;
    if (status) query.status = status;
    if (category) query.category = category;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$or.push({ transactionId: { $regex: search, $options: 'i' } });
      query.$or.push({ description: { $regex: search, $options: 'i' } });
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

exports.getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email');

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Security check: Must be sender, receiver, or admin
    if (
      transaction.senderId?._id.toString() !== req.user._id.toString() &&
      transaction.receiverId?._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'school_admin'
    ) {
      res.status(403);
      throw new Error('Not authorized to view this transaction');
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

exports.getTransactionSummary = async (req, res, next) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { $or: [{ senderId: req.user._id }, { receiverId: req.user._id }] } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { _id: -1 } }
    ]);
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};
