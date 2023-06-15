const express = require('express');
const router = express.Router();
const path = require('path');

const productsController = require('../controllers/products')

router.get('/add-product', productsController.getAddProducts);

router.post('/add-product', productsController.postProducts);

module.exports = router;