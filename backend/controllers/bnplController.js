const PaymentPlan = require('../models/PaymentPlan');
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');

exports.apply = async (req, res, next) => {
  try {
    const { studentId, amount, months } = req.body;

    if (![3, 6, 12].includes(months)) {
      res.status(400);
      throw new Error('Plan type must be 3, 6, or 12 months');
    }

    if (amount >= 200000 || amount <= 0) {
      res.status(400);
      throw new Error('Amount must be positive and less than 200,000');
    }

    // Find system/school admin user to transfer initial fee
    const systemAdmin = await User.findOne({ role: 'school_admin' });
    if (!systemAdmin) {
      res.status(500);
      throw new Error('System account not found');
    }

    const parentWallet = await Wallet.findOne({ userId: req.user._id });
    if (!parentWallet) {
      res.status(404);
      throw new Error('Parent wallet not found');
    }

    // Creating initial transaction transferring funds
    const transaction = await Transaction.create({
      transactionId: `TXN-BNPL-${Date.now()}`,
      senderId: req.user._id,
      receiverId: systemAdmin._id,
      amount, // Entire fee is settled by BNPL provider to the school
      type: 'fee',
      status: 'successful',
    });

    // Create PaymentPlan document
    const installments = [];
    const installmentAmount = amount / months;
    let currentDate = new Date();

    for (let i = 1; i <= months; i++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      installments.push({
        installmentNumber: i,
        dueDate: new Date(currentDate),
        amount: installmentAmount,
        status: 'scheduled',
      });
    }

    const plan = await PaymentPlan.create({
      parentId: req.user._id,
      studentId, // In a real app we would validate studentId exists
      totalAmount: amount,
      planType: months,
      installments,
    });

    res.status(201).json({ success: true, data: { plan, transaction } });
  } catch (error) {
    next(error);
  }
};
