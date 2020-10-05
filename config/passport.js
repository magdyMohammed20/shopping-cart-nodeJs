const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use('local-signin', new localStrategy({
    usernameField: 'email', // Take Name Of Email Input Field
    usernameField: 'password', // Take Name Of Password Input Field
    passReqToCallback: true
}, (req, email, password, done) => {
    // Search For User With Email
    User.findOne({ email }, (err, user) => {
        if (err) {
            // If Error Return Done With Error And User Is False
            return done(err, false)
        }

        if (!user) {
            return done(null, false, req.flash('signInError', 'User Not Founded'))
        }

        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('signInError', 'Wrong Password'))
        } else {
            return done(null, user)
        }

    })
}))