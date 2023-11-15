const express = require('express');

const feedControler = require('../controllers/feed');
const router = express.Router();

router.get('/posts', feedControler.getPosts);
router.post('/posts', feedControler.createPost);

module.exports = router;