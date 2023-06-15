const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/products');
const infraController = require('./controllers/infra');

const addProductRouter = require('./routes/add-product');
const shopRouter = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', addProductRouter);
app.use(shopRouter);

app.use(infraController.notFound);

app.listen(3000);