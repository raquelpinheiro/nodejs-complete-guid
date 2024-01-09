const { validationResult } = require('express-validator');
const Post = require('../models/post');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    try {
        const totalItems = await Post.find().countDocuments();
        const posts = await Post.find().skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({ posts: posts, totalItems: totalItems });
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    };
};

exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: req.userId
    });
    try {
        await post.save();
        const user = await User.findById(req.userId);
        let creator = user;
        user.posts.push(post);
        await user.save();
        res.status(201).json({
            post: result,
            creator: { id: creator._id, name: creator.name }
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

exports.getPost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId)
        if (!post) {
            const error = new Error('Not found post');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ post: post });
    }
    catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.imageUrl;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        throw error;
    }
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        var error = new Error('No file picked');
        error.statusCode = 422;
        throw error;
    }
    try {
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Not found post');
            error.statusCode = 404;
            throw error;
        }
        if (imageUrl !== post.imageUrl)
            clearImage(post.imageUrl);

        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        await post.save();
        res.status(200).json({ post: result });
    } catch (error) {
        if (!error.statusCode)
            error.statusCode = 500;
        next(error);
    };
};

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Not found post');
            error.statusCode = 404;
            throw error;
        }
        clearImage(post.imageUrl);
        await Post.findByIdAndRemove(postId);

        const user = await User.findById(req.userId);
        user.posts.pull(postId);
        await user.save();

        res.status(200);
    } catch (error) {
        if (!error.statusCode)
            error.statusCode = 500;
        next(error);
    };
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => {
        if (!err)
            console.error(err);
    });
};