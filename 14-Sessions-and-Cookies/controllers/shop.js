const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      const isLoggedIn = req.session.isLoggedIn;
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticate: isLoggedIn
      });
    }).catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      const isLoggedIn = req.session.isLoggedIn;
      res.render('shop/product-detail',
        {
          product: product,
          pageTitle: 'Product details',
          path: '/products',
          isAuthenticate: isLoggedIn
        });
    }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find().then(products => {
    const isLoggedIn = req.session.isLoggedIn;
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticate: isLoggedIn
    });
  }).catch(err => console.error(err));
};

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      const isLoggedIn = req.session.isLoggedIn;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        items: products,
        isAuthenticate: isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      const isLoggedIn = req.session.isLoggedIn;
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticate: isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user.addToCart(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user.removeItemFromCart(productId)
    .then(() => {
      return Product.find()
        .then(products => {
          res.redirect('/cart');
        })
    })
    .catch(err => console.log(err));
};