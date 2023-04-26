const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const addProductRouter = require('./routes/add-product');
const addShopRouter = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false }) );
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', addProductRouter.routes);
app.use(addShopRouter);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle:'Not found page'});
});

app.listen(3000);