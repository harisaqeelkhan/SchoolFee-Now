const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const checkSuspicious = require('../utils/suspiciousRules');
const { createNotification } = require('./notificationController');

exports.getWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      res.status(404);
      throw new Error('Wallet not found');
    }
    res.status(200).json({ success: true, data: wallet });
  } catch (error) {
    next(error);
  }
};

exports.deposit = async (req, res, next) => {
  try {
    const { amount } = req.body;
    
    if (amount <= 0) {
      res.status(400);
      throw new Error('Amount must be positive');
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      res.status(404);
      throw new Error('Wallet not found');
    }

    wallet.balance += amount;
    wallet.totalDeposits += amount;
    await wallet.save();

    const { suspiciousFlag, suspiciousReasons } = checkSuspicious(req.user, amount, 'deposit', null);

    const transaction = await Transaction.create({
      transactionId: `TXN-${Date.now()}`,
      receiverId: req.user._id,
      amount,
      type: 'deposit',
      status: 'successful',
      suspiciousFlag,
      suspiciousReasons,
    });

    await createNotification(req.user._id, 'Deposit Successful', `Deposited PKR ${amount}`, 'transaction', transaction._id);
    if (suspiciousFlag) {
      await createNotification(req.user._id, 'Suspicious Activity Detected', 'Your recent deposit was flagged.', 'security', transaction._id);
    }

    res.status(200).json({ success: true, data: { wallet, transaction } });
  } catch (error) {
    next(error);
  }
};

exports.withdraw = async (req, res, next) => {
  try {
    const { amount } = req.body;
    
    if (amount <= 0) {
      res.status(400);
      throw new Error('Amount must be positive');
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      res.status(404);
      throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
      // Record failed transaction
      await Transaction.create({
        transactionId: `TXN-${Date.now()}`,
        senderId: req.user._id,
        amount,
        type: 'withdrawal',
        status: 'failed',
        suspiciousFlag: false,
      });
      await createNotification(req.user._id, 'Withdrawal Failed', 'Insufficient funds for withdrawal.', 'transaction');
      res.status(400);
      throw new Error('Insufficient funds');
    }

    wallet.balance -= amount;
    wallet.totalWithdrawals += amount;
    await wallet.save();

    const { suspiciousFlag, suspiciousReasons } = checkSuspicious(req.user, amount, 'withdrawal', null);

    const transaction = await Transaction.create({
      transactionId: `TXN-${Date.now()}`,
      senderId: req.user._id,
      amount,
      type: 'withdrawal',
      status: 'successful',
      suspiciousFlag,
      suspiciousReasons,
    });

    await createNotification(req.user._id, 'Withdrawal Successful', `Withdrew PKR ${amount}`, 'transaction', transaction._id);
    if (wallet.balance < 5000) {
      await createNotification(req.user._id, 'Low Balance', 'Your wallet balance is running low.', 'account');
    }
    if (suspiciousFlag) {
      await createNotification(req.user._id, 'Suspicious Activity Detected', 'Your recent withdrawal was flagged.', 'security', transaction._id);
    }

    res.status(200).json({ success: true, data: { wallet, transaction } });
  } catch (error) {
    next(error);
  }
};

exports.transfer = async (req, res, next) => {
  try {
    const { receiverEmail, amount } = req.body;

    if (amount <= 0) {
      res.status(400);
      throw new Error('Amount must be positive');
    }

    const receiver = await User.findOne({ email: receiverEmail });
    if (!receiver) {
      res.status(404);
      throw new Error('Receiver not found');
    }

    if (receiver.status === 'blocked') {
      res.status(400);
      throw new Error('Receiver is blocked');
    }

    if (req.user._id.toString() === receiver._id.toString()) {
      res.status(400);
      throw new Error('Cannot transfer to yourself');
    }

    const senderWallet = await Wallet.findOne({ userId: req.user._id });
    const receiverWallet = await Wallet.findOne({ userId: receiver._id });

    if (!senderWallet || !receiverWallet) {
      res.status(404);
      throw new Error('Wallet not found');
    }

    if (senderWallet.balance < amount) {
      await Transaction.create({
        transactionId: `TXN-${Date.now()}`,
        senderId: req.user._id,
        receiverId: receiver._id,
        amount,
        type: 'transfer',
        status: 'failed',
        suspiciousFlag: false,
      });
      await createNotification(req.user._id, 'Transfer Failed', 'Insufficient funds for transfer.', 'transaction');
      res.status(400);
      throw new Error('Insufficient funds');
    }

    senderWallet.balance -= amount;
    senderWallet.totalTransfersOut += amount;
    await senderWallet.save();

    receiverWallet.balance += amount;
    receiverWallet.totalTransfersIn += amount;
    await receiverWallet.save();

    const { suspiciousFlag, suspiciousReasons } = checkSuspicious(req.user, amount, 'transfer', receiver._id.toString());

    const transaction = await Transaction.create({
      transactionId: `TXN-${Date.now()}`,
      senderId: req.user._id,
      receiverId: receiver._id,
      amount,
      type: 'transfer',
      status: 'successful',
      suspiciousFlag,
      suspiciousReasons,
    });

    await createNotification(req.user._id, 'Transfer Sent', `Transferred PKR ${amount} to ${receiver.email}`, 'transaction', transaction._id);
    await createNotification(receiver._id, 'Transfer Received', `Received PKR ${amount} from ${req.user.email}`, 'transaction', transaction._id);

    if (suspiciousFlag) {
      await createNotification(req.user._id, 'Suspicious Activity Detected', 'Your recent transfer was flagged.', 'security', transaction._id);
    }

    res.status(200).json({ success: true, data: { senderWallet, transaction } });
  } catch (error) {
    next(error);
  }
};
