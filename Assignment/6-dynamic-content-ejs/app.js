const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoute = require('./routes/users');
const addUserRoute = require('./routes/add-user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoute);
app.use(addUserRoute.routes);

app.listen(3000);