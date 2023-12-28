const User = require('../models/user');

exports.getStatus = (req, res, next) => {
    const userId = req.params.userId;
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

exports.updateStatus = (req, res, next) => {
    console.info(req.body.userId);
    const status = req.body.status;
    const userId = req.body.userId;
    User.findById(userId)
    .then(user => {
        user.status = status;
        return user.save();
    })
    .then(result => {
        res.status(200).json({status: status});
    })
    .catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};
