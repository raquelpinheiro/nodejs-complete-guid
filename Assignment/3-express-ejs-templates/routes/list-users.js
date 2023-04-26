const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res, next) => {
    res.render('list-users', {
        users: users,
        path: '/'
    });
});

exports.routes = router;
exports.users = users;
