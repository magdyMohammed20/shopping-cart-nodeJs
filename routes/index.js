var express = require('express');
var router = express.Router();
const Products = require('../models/product')

/* GET home page. */
router.get('/', function (req, res, next) {
  // Fetching Data From MongoDB And Pass It To Home Page
  Products.find({}, (err, products) => {
    if (err) {
      console.log('Error While Fetching Products Data')
      return
    } else {
      res.render('index', { products });
    }
  })

});

module.exports = router;
