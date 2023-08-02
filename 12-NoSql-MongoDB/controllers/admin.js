const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl);
  product.save()
    .then(result => {
      console.log(result);
      res.redirect('/');
    }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.query.id;
  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
    }).catch(e => console.error(e));
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const productId = req.body.productId;

  Product.findById(productId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.update();
    })
    .then(result => res.redirect('/admin/products'))
    .catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(result => {
      res.redirect('/admin/products');
    }).catch(err => console.error(err));
};