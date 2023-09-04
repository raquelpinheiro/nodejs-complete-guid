const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLoginSession);
router.post('/login', authController.postLoginSession);

module.exports = router;