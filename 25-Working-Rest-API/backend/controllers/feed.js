const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: '1',
                title: 'First post',
                creator: {
                    name: 'Raquel'
                },
                content: 'This is a post',
                imageUrl: 'images/bicycle.png',
                createdAt: new Date()
            }
        ]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, data is incorret',
            errors: errors.array()
        })
    }
    res.status(201).json({
        _id: '2',
        title: req.body.title,
        content: req.body.content,
        creator: {
            name: 'Raquel'
        },
        imageUrl: 'images/bicycle.png',
        createdAt: new Date()
    });
};