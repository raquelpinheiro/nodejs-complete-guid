const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

const auth = require('../middlewares/auth');

router.get('/', shopController.getIndex);

router.get('/products', auth, shopController.getProducts);

router.get('/products/:productId', auth, shopController.getProduct);

router.post('/cart', auth, shopController.postCart);

router.get('/cart', auth, shopController.getCart);

router.post('cart-delete-item', auth, shopController.postCartDeleteItem);

//router.post('/create-order', shopController.postOrder);

//router.get('/orders', shopController.getOrders);

//router.get('/checkout', shopController.getCheckout);

module.exports = router;
