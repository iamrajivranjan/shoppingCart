var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
// All routes are csrf protected
router.use(csrfProtection);

var Product = require('../models/product');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var products = await Product.find();

  res.render('shop/index', { title: 'Express', products: products });
});

/**
 * Get USER | Signup
 */
router.get('/user/signup', function(req, res, next){
  var messages = req.flash('error'); 
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

/**
 * Post USER | Signup
 */
router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

/**
 * Get Profile 
 */
router.get('/user/profile', function(req, res, next){
  res.render('user/profile')
})

/**
 * SIGNIN \ GET
 */
router.get('/user/signin', function(req, res, next){
  var messages = req.flash('error'); 
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

/**
 * SIGNIN | POST
 */
router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

module.exports = router;
