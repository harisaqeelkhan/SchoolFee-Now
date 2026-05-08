const express = require('express');
const { getUserReport, getAdminReport, getIncomeExpenseReport, getBudgetUsageReport } = require('../controllers/reportsController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/user-dashboard', getUserReport);
router.get('/income-expense', getIncomeExpenseReport);
router.get('/budget-usage', getBudgetUsageReport);
router.get('/admin', authorize('school_admin'), getAdminReport);

module.exports = router;
