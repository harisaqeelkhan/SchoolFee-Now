const express = require('express');
const { apply } = require('../controllers/bnplController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);

router.post('/apply', apply);

module.exports = router;
