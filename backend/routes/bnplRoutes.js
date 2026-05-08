const express = require('express');
const { linkStudent, getFeeStructure, submitApplication } = require('../controllers/bnplController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.post('/students/link', linkStudent);
router.get('/fee-structure/:id', getFeeStructure);
router.post('/applications', submitApplication);

module.exports = router;
