const User = require('../models/user')
const express = require('express')
const router = express.Router()

const passport = require('../config/ppConfig')

var request = require('request-promise');

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {

// do post request from front-end(form) at http://localhost:4000/register
  // then, you will get the username of codewar (req.body)
  request({
  "method":"GET",
  "uri": "https://www.codewars.com/api/v1/users/" + req.body.user.username,
  "json": true,
  "headers": {
    "User-Agent": "My little demo app"
  }
}).then(console.log, console.log);
  // call api with the username(fetch or diff library)
    //then you will get the json
      //then make new user with the json info
        // then save


  var formData = req.body.user
  var newUser = new User({
    username: formData.username,
    gender: formData.gender,
    email: formData.email,
    password: formData.password,
  })

  newUser.language = 'js'

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
