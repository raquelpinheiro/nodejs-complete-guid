const express = require('express');
const bodyParser = require('body-parser');

const listUserRoute = require('./routes/list-users');
const addUserRoute =require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(listUserRoute.routes);
app.use(addUserRoute);

app.use((req, res, next) =>{
    res.status(404).render('404', {titlePage:'Sorry, not found'});
});

app.listen(3000);