const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  const isLoggedIn = req.session.user ? true : false;
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isAuthenticate: isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseFloat(req.body.price);
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    res.redirect('/');
  }).catch(err => console.error(err));  
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    const isLoggedIn = req.session.user ? true : false;
    console.log(rows);
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true,
      isAuthenticate: isLoggedIn
    });
  }).catch(err => console.log(err));
};
