var express = require('express');
var router = express.Router();
// Import Express Validator As Object
const { check, validationResult } = require('express-validator')
// Import User Model For Saving Data Into MongoDB
const User = require('../models/user')

/* GET users listing. */
router.get('/userSignUp', function (req, res, next) {
  const messagesError = req.flash('error')
  res.render('Pages/userSignUp', { messagesError })
});

router.post('/userSignUp', [
  check('email').not().isEmpty().withMessage('Please Enter Your Email'),
  check('email').isEmail().withMessage('Please Enter Valid Email'),
  check('password').not().isEmpty().withMessage('Please Enter Your Password'),
  check('password').isLength({ min: 8, max: 15 }).withMessage('Password Must Be Greater Than 8 Characters And Less Than 15 Characters'),
  check('confirmPassword').custom((confirmValue, { req }) => {
    // If Confirm Not Matched Return Error Else Return True
    if (confirmValue !== req.body.password) {
      throw new Error('Password Not Matched')
    }

    return true
  })
], function (req, res, next) {

  const errors = validationResult(req)
  // If All Field Is Not Valid Send Errors Else Fetch email And Password And Save To MongoDB
  if (!errors.isEmpty()) {

    let validationMessages = []
    let allErrors = errors.errors
    for (let errMsgs of allErrors) {
      //console.log(allErrors[errMsgs].msg)
      validationMessages.push(errMsgs.msg)
    }

    // Send All Errors To User SignUp Page
    req.flash('error', validationMessages)
    res.redirect('userSignUp')

  } else {

    // Call Model And Pass email And Encrypted Password
    const user = new User({
      email: req.body.email,
      password: new User().hashPassword(req.body.password)
    })

    // Check If User Already SignUp With It's Email Before Saving SignUp Data Into MongoDB
    User.findOne({ email: req.body.email }, (err, data) => {
      if (err) {
        console(err)
      } else {
        // If User Already Exist Send Exist Message
        if (data) {
          req.flash('error', 'User Already Exist')
          res.redirect('userSignUp')
          return
        } else {
          //Save Email And Password To MongoDB
          user.save((err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.send(result)
            }
          })
        }
      }
    })

  }

});

module.exports = router;
