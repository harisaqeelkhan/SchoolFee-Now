const express = require('express');
const { getTransactions, getTransactionById } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/', getTransactions);
router.get('/:id', getTransactionById);

module.exports = router;
