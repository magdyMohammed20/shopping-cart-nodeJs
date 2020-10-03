var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userSignUp', function (req, res, next) {
  res.render('Pages/userSignUp')
});

router.post('/userSignUp', function (req, res, next) {
  //res.render('Pages/userSignUp')
  console.log(req.body.email)
});

module.exports = router;
