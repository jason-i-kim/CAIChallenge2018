var express = require('express');
var router = express.Router();

var data = {};


/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.query.finalstr);
  res.render('registered', { title: 'Registered!' });
});

module.exports = router;
