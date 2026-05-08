const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense, getExpenseSummary } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/summary', getExpenseSummary);
router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
