var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(window.location,"1111111");
  res.render('index', { title: 'Express' });
});
router.get('/welcome', function(req, res, next) {
  // console.log(window.location,"1111111");
  res.render('welcome', { title: 'Express' });
});

module.exports = router;
