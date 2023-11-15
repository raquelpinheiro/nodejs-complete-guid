const express = require('express');
const feed = require('../controllers/feed');
const { body } = require('express-validator');

const router = express.Router();

router.get('/feed/posts', feed.getPosts);

router.post('/feed/posts', [
    body('title').trim().isLength({ min: 7 }),
    body('content').trim().isLength({ min: 5 })
], feed.createPost);

module.exports = router;