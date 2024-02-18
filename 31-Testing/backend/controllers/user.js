const User = require('../models/user');

exports.getStatus = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json({ status: user.status });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateStatus = async (req, res, next) => {
    console.info(req.body.userId);
    const status = req.body.status;
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        user.status = status;
        await user.save();
        res.status(200).json({ status: status });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
