const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
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
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashPassword,
            name: name,
            status: 'new'
        });
        await user.save();
        res.status(200).json({ userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

exports.createLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; // por que não next(error)?
    }
    const email = req.body.email;
    const password = req.body.password;
    let user;
    try {
        user = await User.findOne({ email: email });
        if (!user) {
            let error = new Error('User could not found');
            error.statusCode = 401;
            throw error;
        }
        const isEqualPassword = await bcrypt.compare(password, user.password);

        if (!isEqualPassword) {
            let error = new Error('User could not found');
            error.statusCode = 401;
            throw error;
        }
        console.log(`User -> ${JSON.stringify(user)}`);
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'supersecretsuper', {
            expiresIn: '1h'
        });
        res.status(200).json({ token: token, userId: user._id.toString() });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorret');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; // por que não next(error)?
    }
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(200).json({ status: user.status });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};