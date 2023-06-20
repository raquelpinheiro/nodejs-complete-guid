const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (cb) => {
    res.render('shop/product-detail',
      {
        product: { ...cb },
        pageTitle: 'Product details',
        path: '/products'
      });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart(cart => {
    let detailsCart = { ...cart };
    res.render('shop/cart', {
      detailsCart: { ...detailsCart },
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id);
  });
  res.redirect('/cart');
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  Cart.deleteProduct(productId);
  res.redirect('/cart');
};