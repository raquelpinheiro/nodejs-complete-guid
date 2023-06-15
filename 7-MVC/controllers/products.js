const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('add-product',
        {
            pageTitle: 'Add product',
            path: '/admin/add-product',
            activeAddProduct: true,
            productCSS: true,
            formsCSS: true
        });
    res.status(200);
};

exports.getProducts = (req, res, next) => {
    let products = Product.fetchAll();
    res.render('shop', 
            { prods: products, 
              pageTitle:'Products', 
              path:'/', 
              hasProducts: (products.length > 0),
              activeShop: true,
              productCSS: true              
            });
    res.status(200);
};

exports.postProducts = (req, res, next) => {
    let product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};