const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

let products = [];

router.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product',
      {
       pageTitle: 'Add product',
       path:'/admin/add-product',
       activeAddProduct: true,
       productCSS: true,
       formsCSS: true
    });
    res.status(200);
});

router.post("/add-product", (req, res, next) =>{
    products.push({ title: req.body.title });
    res.redirect("/");
});

exports.routes = router;
exports.products = products;