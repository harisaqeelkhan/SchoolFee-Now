const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const { createNotification } = require('./notificationController');

exports.getExpenseSummary = async (req, res, next) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
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

exports.getCategoryExpenseSummary = async (req, res, next) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    next(error);
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    const { title, category, amount, date, notes } = req.body;

    if (amount <= 0) {
      res.status(400);
      throw new Error('Amount must be positive');
    }

    const expense = await Expense.create({
      userId: req.user._id,
      title,
      category,
      amount,
      date,
      notes,
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }
    if (expense.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this expense');
    }

    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }
    if (expense.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this expense');
    }

    await Expense.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.setBudget = async (req, res, next) => {
  try {
    const { totalLimit, month } = req.body; // month format "YYYY-MM"

    if (totalLimit <= 0) {
      res.status(400);
      throw new Error('Limit must be positive');
    }

    let budget = await Budget.findOne({ userId: req.user._id, month });

    if (budget) {
      budget.totalLimit = totalLimit;
      await budget.save();
    } else {
      budget = await Budget.create({
        userId: req.user._id,
        month,
        totalLimit,
      });
    }

    res.status(200).json({ success: true, data: budget });
  } catch (error) {
    next(error);
  }
};

exports.getBudgets = async (req, res, next) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    next(error);
  }
};

exports.updateBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(404);
      throw new Error('Budget not found');
    }
    if (budget.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

exports.deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(404);
      throw new Error('Budget not found');
    }
    if (budget.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    await Budget.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.getBudgetStatus = async (req, res, next) => {
  try {
    const { month } = req.query; // format "YYYY-MM"
    if (!month) {
      res.status(400);
      throw new Error('Month parameter is required');
    }

    const budget = await Budget.findOne({ userId: req.user._id, month });
    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not set for this month' });
    }

    // Find all expenses for this month
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    });

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    budget.spentAmount = totalExpenses;
    
    const percentage = (totalExpenses / budget.totalLimit) * 100;

    let previousStatus = budget.status;

    if (percentage > 100) {
      budget.status = 'exceeded';
    } else if (percentage >= budget.warningThreshold) {
      budget.status = 'nearLimit';
    } else {
      budget.status = 'safe';
    }

    await budget.save();

    if (budget.status === 'exceeded' && previousStatus !== 'exceeded') {
      await createNotification(req.user._id, 'Budget Exceeded', `You have exceeded your budget limit for ${month}.`, 'budget');
    } else if (budget.status === 'nearLimit' && previousStatus !== 'nearLimit' && previousStatus !== 'exceeded') {
      await createNotification(req.user._id, 'Budget Warning', `You are near your budget limit for ${month}.`, 'budget');
    }

    res.status(200).json({ success: true, data: budget });
  } catch (error) {
    next(error);
  }
};
