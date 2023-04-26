const express = require('express');
const router = express.Router();

let usersData = require('./list-users');

router.post('/add-user', (req, res, next) => {
    usersData.users.push({name: req.body.userName});
    res.redirect('/');
});
