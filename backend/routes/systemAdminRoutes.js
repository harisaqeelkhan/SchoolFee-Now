const express = require('express');
const { getSystemStats } = require('../controllers/systemAdminController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);
router.use(authorize('system_admin'));

router.get('/stats', getSystemStats);

module.exports = router;
