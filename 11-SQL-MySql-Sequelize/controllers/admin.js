const Product = require('../models/product');
const Cart = require('../models/cart');

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
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  }).then(result => {
    console.log(result);
    res.redirect('/');
  }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.query.id;
  req.user.getProducts({ where: { id: productId } })
    .then((products) => {
      res.render('admin/edit-product', {
        product: products[0],
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
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(result => res.redirect('/admin/products'))
    .catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId).then(product => {
    return productDeleted.destroy();
  }).then(result => {
    res.redirect('/admin/products');
  }).catch(err => console.error(err));
};