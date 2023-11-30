const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; // por que não next(error) ?
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashPassword => {
        const user = new User({
            email: email,
            password: hashPassword,
            name: name,
            status: 'new'
        });
        return user.save();
    })
    .then(result => {
        res.status(200).json({userId: result._id});
    })
    .catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};