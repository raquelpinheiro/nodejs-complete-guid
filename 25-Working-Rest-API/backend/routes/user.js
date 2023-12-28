const express = require('express');
const user = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/status/:userId', isAuth, user.getStatus);
router.post('/status', isAuth, user.updateStatus);

module.exports = router;