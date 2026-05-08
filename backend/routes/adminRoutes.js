const express = require('express');
const { getUsers, toggleUserBlock, getWallets, getFlaggedTransactions, getDashboardData, getAllTransactions } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { validateObjectId } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.use(protect);
router.use(authorize('school_admin'));

router.get('/users', getUsers);
router.patch('/users/:id/block', validateObjectId, toggleUserBlock);
router.get('/wallets', getWallets);
router.get('/transactions', getAllTransactions);
router.get('/transactions/flagged', getFlaggedTransactions);
router.get('/dashboard', getDashboardData);

module.exports = router;
