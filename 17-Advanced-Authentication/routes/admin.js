const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();
const auth = require('../middlewares/auth');

// /admin/add-product => GET
router.get('/add-product', auth, adminController.getAddProduct);

router.get('/products', auth, adminController.getProducts);

router.post('/add-product', auth, adminController.postAddProduct);

router.get('/edit-product', auth, adminController.getEditProduct);

router.post('/edit-product', auth, adminController.postEditProduct);

router.post('/delete-product', auth, adminController.postDeleteProduct);

module.exports = router;