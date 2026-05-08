const express = require('express');
const { linkStudent, getFeeStructure, submitApplication } = require('../controllers/bnplController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/students/link', protect, linkStudent);
router.get('/fee-structure/:id', protect, getFeeStructure);
router.post('/applications', protect, submitApplication);

module.exports = router;
