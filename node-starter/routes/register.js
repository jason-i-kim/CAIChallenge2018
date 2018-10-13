var express = require('express');
var router = express.Router();

var data = {};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register'});
});

module.exports = router;
