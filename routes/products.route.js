var express = require('express');
var router = express.Router();
var productController = require('../controller/product.controller');

router.get('/', productController.index);

router.get('/search', productController.search);

module.exports = router;