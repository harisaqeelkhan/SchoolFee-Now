const express = require('express');
const { getUsers, getUserById, toggleUserBlock, getWallets, getFlaggedTransactions, getDashboardData, getAllTransactions, getTransactionVolume, getSystemBalance } = require('../controllers/adminController');
const { createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { validateObjectId } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.use(protect);
router.use(authorize('school_admin'));

router.get('/users', getUsers);
router.get('/users/:id', validateObjectId, getUserById);
router.patch('/users/:id/block', validateObjectId, toggleUserBlock);
router.patch('/users/:id/unblock', validateObjectId, toggleUserBlock); // Alias
router.get('/wallets', getWallets);
router.get('/transactions', getAllTransactions);
router.get('/transactions/flagged', getFlaggedTransactions);
router.get('/dashboard', getDashboardData);
router.get('/reports/transaction-volume', getTransactionVolume);
router.get('/reports/system-balance', getSystemBalance);

// Alias /admin/categories to category controller
router.get('/categories', require('../controllers/categoryController').getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.patch('/categories/:id/disable', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
