const express = require('express');
const { setBudget, getBudgetStatus } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.post('/', setBudget);
router.get('/status', getBudgetStatus);

module.exports = router;
