const express = require('express');
const { register, login, getProfile, updateProfile, updatePassword } = require('../controllers/authController');
const { validateBody } = require('../middlewares/validationMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', validateBody(['name', 'email', 'password', 'role']), register);
router.post('/login', validateBody(['email', 'password']), login);

router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/password', validateBody(['oldPassword', 'newPassword']), updatePassword);

module.exports = router;
