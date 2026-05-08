const express = require('express');
const { register, login, getProfile, updateProfile, updatePassword, logout } = require('../controllers/authController');
const { validateBody } = require('../middlewares/validationMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', validateBody(['name', 'email', 'password', 'role']), register);
router.post('/login', validateBody(['email', 'password']), login);

router.use(protect);
router.post('/logout', logout);
router.get('/me', getProfile);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/password', validateBody(['oldPassword', 'newPassword']), updatePassword);
router.put('/change-password', validateBody(['oldPassword', 'newPassword']), updatePassword);

module.exports = router;
