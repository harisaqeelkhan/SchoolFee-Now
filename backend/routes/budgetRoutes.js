const express = require('express');
const { setBudget, getBudgetStatus, getBudgets, updateBudget, deleteBudget } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.post('/', setBudget);
router.get('/', getBudgets);
router.get('/current', getBudgetStatus);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;
