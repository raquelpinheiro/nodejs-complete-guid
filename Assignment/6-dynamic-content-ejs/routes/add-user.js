const express = require('express');
const router = express.Router();

let allUsers = [];

router.get('/add-user', (req, res, next) => {
    res.render('add-user', { pageTitle: 'Add User', hasUsers: allUsers.length > 0, users: allUsers });
    res.status(200);
});

router.post('/add-user', (req, res, next) => {
    allUsers.push({ userName: req.body.userName });
    res.redirect('/');
});

exports.routes = router;
exports.users = allUsers;