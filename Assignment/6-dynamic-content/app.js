const express = require('express');
const bodyParser = require('body-parser');
const expressHds = require('express-handlebars');

const app = express();

const allUsers = [];

//app.engine('handlebars', expressHds.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
//app.set('view engine', 'handlebars');

//app.set('view engine', 'pug');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, nex) => {
    res.render('index', {pageTitle: 'Add User', hasUsers: allUsers.length > 0});
});

app.get('/users', (req, res, next) => {
    res.render('users', {pageTitle:'Users', users: allUsers, hasUsers: allUsers.length > 0});
});

app.post('/add-user', (req, res, next) => {
    allUsers.push({userName: req.body.userName});
    res.redirect('/users');
});

app.listen(3000);