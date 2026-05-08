const express = require('express');
const { getUserReport, getAdminReport } = require('../controllers/reportsController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/user', getUserReport);
router.get('/admin', authorize('school_admin'), getAdminReport);

module.exports = router;
