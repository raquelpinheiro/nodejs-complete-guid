const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    }).catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then(([rows]) => {
    res.render('shop/product-detail',
      {
        product: rows[0],
        pageTitle: 'Product details',
        path: '/products'
      });
  }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.error(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  const newQuantity = 1;

  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId }})
    .then(products => {
      if (products.length > 0){
        let product = products[0];
        const oldQuantity = product.cartItem.quantity;
        newQuantity += oldQuantity;
        return product;
      }
      return Product.findById(productId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: {quantity: newQuantity }
      })
    })
    .then(() =>{
      res.redirect('/cart');
    })
  })
  .catch(err => console.log(err)); 
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId }})
    .then(products => {
      if (products.length > 0){
        let product = products[0];
        product.cartItem.destroy();
      }
    })
    .then(() =>{
      res.redirect('/cart');
    })
  })
  .catch(err => console.log(err));
};