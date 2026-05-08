const express = require('express');
const { getTransactions, getTransactionById, getTransactionSummary } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/summary/monthly', getTransactionSummary);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.get('/:id/receipt', getTransactionById); // Alias

module.exports = router;
