const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.createLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; // por que não next(error)?
    }
    const email = req.body.email;
    const password = req.body.password;
    let user = new User();    
    User.findOne({email: email})
    .then(result => {
        if (!result){
            let error = new Error('User could not found');
            error.statusCode = 401;
            throw error;
        }
        user = result;
        return bcrypt.compare(password, user.password);
    }).
    then(isEqual => {
        if (!isEqual){
            let error = new Error('User could not found');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'supersecretsuper', {
            expiresIn: '1h'
        });
        res.status(200).json({token: token, userId: user._id.toString()});
    })
    .catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.getLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; // por que não next(error)?
    }
    const userId = req.userId;
    User.findById(userId)
    .then(user => {
        res.status(200).json({status: user.status});
    })
    .catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};