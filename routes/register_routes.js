const User = require('../models/user')
const express = require('express')
const router = express.Router()

const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {
  var formData = req.body.user
  var newUser = new User({
    username: formData.username,
    gender: formData.gender,
    email: formData.email,
    password: formData.password,
  })
  newUser.save()
  .then(
    user => {
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/register'
      })(req, res)
    },
    err => console.log(err)
  )
})

module.exports = router
