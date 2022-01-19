const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
