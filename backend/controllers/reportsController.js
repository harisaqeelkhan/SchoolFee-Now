const Transaction = require('../models/Transaction');
const Expense = require('../models/Expense');
const Wallet = require('../models/Wallet');

exports.getUserReport = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Spending by category
    const categorySpending = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ]);

    // Income vs Expense (Deposit vs Withdrawal/TransferOut)
    const incomeExpense = await Wallet.findOne({ userId }).select('totalDeposits totalWithdrawals totalTransfersOut totalTransfersIn');

    res.status(200).json({
      success: true,
      data: {
        categorySpending,
        walletSummary: incomeExpense
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getIncomeExpenseReport = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const incomeExpense = await Wallet.findOne({ userId }).select('totalDeposits totalWithdrawals totalTransfersOut totalTransfersIn');
    res.status(200).json({ success: true, data: incomeExpense });
  } catch (error) {
    next(error);
  }
};

exports.getBudgetUsageReport = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // Just pulling all budgets as summary for now
    const Budget = require('../models/Budget');
    const budgets = await Budget.find({ userId });
    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    next(error);
  }
};

exports.getAdminReport = async (req, res, next) => {
  try {
    // Transaction volume by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const transactionTrends = await Transaction.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo }, status: 'successful' } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          volume: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        transactionTrends
      }
    });
  } catch (error) {
    next(error);
  }
};
