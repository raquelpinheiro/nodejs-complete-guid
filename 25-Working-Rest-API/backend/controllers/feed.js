const { validationResult } = require('express-validator');
const Post = require('../models/post');
const path = require('path');
const fs = require('fs');

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    const totalItems = 0;
    Post.find().countDocuments()
    .then(count => {
        totalItems = count;
        return Post.find().skip((currentPage - 1) * perPage).limit(perPage);
    }).then(posts => {
        res.status(200).json({ posts: posts, totalItems: totalItems });
    })
    .catch(err => {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    });          
};

exports.createPost = (req, res, next) => {
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
        creator: {
            name: 'Raquel'
        }
    });
    post.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId).
        then(post => {
            if (!post) {
                const error = new Error('Not found post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ post: post });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })
};

exports.updatePost = (req, res, next) => {
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
    Post.findById(postId)
        .then(post => {
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
            return post.save();
        }).then(result => {
            res.status(200).json({ post: result });
        })
        .catch(error => {
            if (!error.statusCode)
                error.statusCode = 500;
            next(error);
        });
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Not found post');
                error.statusCode = 404;
                throw error;
            }
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId);
        }).then(result => {
            res.status(200);
        })
        .catch(error => {
            if (!error.statusCode)
                error.statusCode = 500;
            next(error);
        });
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => {
        if (!err)
            console.error(err);
    });
};