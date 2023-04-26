const express = require('express');
const router = express.Router();
const usersData = require('./add-user');

router.get('/users', (req, res, next) => {
    res.render('users', {
        pageTitle: 'Add User', hasUsers: usersData.users.length > 0,
        users: usersData.users
    });
});

router.get('/', (req, res, next) => {
    res.render('users', { 
        pageTitle: 'Add User', hasUsers: usersData.users.length > 0,
        users: usersData.users
    });
});

module.exports = router;