const express = require('express');
const { getWallet, deposit, withdraw, transfer } = require('../controllers/walletController');
const { protect } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.use(protect);

router.get('/', getWallet);
router.get('/summary', getWallet);
router.post('/deposit', validateBody(['amount']), deposit);
router.post('/withdraw', validateBody(['amount']), withdraw);
router.post('/transfer', validateBody(['receiverEmail', 'amount']), transfer);

module.exports = router;
