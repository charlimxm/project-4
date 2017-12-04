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
    email: formData.email,
    password: formData.password,
    gender: formData.gender,
    imageUrl: formData.imageUrl
  })

  newUser.save()
  .then(
    user => {
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res)
    },
    err => res.send(err)
  )
})


module.exports = router
