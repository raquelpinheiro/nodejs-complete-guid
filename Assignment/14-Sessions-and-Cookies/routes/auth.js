const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLoginSession);
router.post('/login', authController.postLoginSession);
router.post('/logout', authController.postLogout);

module.exports = router;