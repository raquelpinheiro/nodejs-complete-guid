const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLoginSession);
router.post('/login', authController.postLoginSession);
router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;