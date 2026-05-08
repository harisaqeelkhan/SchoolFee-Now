const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense, getExpenseSummary, getCategoryExpenseSummary } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/summary/monthly', getExpenseSummary);
router.get('/summary/categories', getCategoryExpenseSummary);
router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
