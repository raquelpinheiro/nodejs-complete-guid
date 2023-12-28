const express = require('express');
const feed = require('../controllers/feed');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', isAuth, feed.getPosts);

router.post('/posts', isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })],
    feed.createPost);

router.put('/post/:postId', isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })],
    feed.updatePost);

router.delete('/post/:postId', isAuth, feed.deletePost);

module.exports = router;