var express = require('express');
var router = express.Router();

var Product = require('../models/product');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var products = await Product.find();

  res.render('shop/index', { title: 'Express', products: products });
});

module.exports = router;
