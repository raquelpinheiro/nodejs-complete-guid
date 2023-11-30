const express = require('express');
const feed = require('../controllers/feed');
const { body } = require('express-validator');

const router = express.Router();

router.get('/posts', feed.getPosts);

router.post('/posts', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })],
    feed.createPost);

router.put('/post/:postId', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })],
    feed.updatePost);

router.delete('/post/:postId', feed.deletePost);

module.exports = router;