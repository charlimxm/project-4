const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

passport.use(new LocalStrategy({
  useremailField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, next) => {
  User.findOne({email: email})
  .then(user => {
    if (!user) return next(null, false)

    user.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) return next(null, user)
      return next(null, false, { message: 'mismatched'})
    })
  })
  .catch(err => next(err))
}))

module.exports = passport
