const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product (filtered from app.js)
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product
router.get('/products', adminController.getProducts);

// /admin/add-product
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
