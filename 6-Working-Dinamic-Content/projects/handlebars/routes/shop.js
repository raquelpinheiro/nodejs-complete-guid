const express = require('express');
const router = express.Router();
const path = require('path');
const productData = require('./add-product');

router.get('/', (req, res, next) =>{
    console.log(`Products: ${productData.products.map(p => p.title)}`);
    res.render('shop', 
            { prods: productData.products, 
              pageTitle:'Products', 
              path:'/', 
              hasProducts: (productData.products.length > 0),
              activeShop: true,
              productCSS: true              
            });
    res.status(200);
});

module.exports = router;