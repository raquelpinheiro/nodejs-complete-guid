const express = require('express');
const router = express.Router();
const path = require('path');
const routeDir = require('../util/path');
const productData = require('./add-product');

router.get("/", (req, res, next) =>{
    console.log(`Products: ${productData.products.map(p => p.title)}`);
    //res.sendFile(path.join(routeDir, 'views', 'shop.html'));
    res.render('shop', {prods: productData.products, pageTitle:'Products', path:'/'});
    res.status(200);
});

module.exports = router;