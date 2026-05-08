const express = require('express');
const { linkStudent, getFeeStructure, submitApplication, getPaymentPlans, getInstallments, payInstallment } = require('../controllers/bnplController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/students/link', protect, linkStudent);
router.get('/fee-structure/:id', protect, getFeeStructure);
router.post('/applications', protect, submitApplication);
router.get('/plans', protect, getPaymentPlans);
router.get('/installments', protect, getInstallments);
router.post('/installments/:id/pay', protect, payInstallment);

module.exports = router;
