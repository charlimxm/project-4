const User = require('../models/user')
const express = require('express')
const router = express.Router()

const passport = require('../config/ppConfig')

var rp = require('request-promise')

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {
  var languages = {}
  var options = {
    method: 'GET',
    uri: 'https://www.codewars.com/api/v1/users/' + req.body.user.username,
    json: true // Automatically parses the JSON string in the response
  }

  rp(options)
    .then(
      function (obj) {
        for (language in obj.ranks.languages) {
          languages[language] = obj.ranks.languages[language].name
        }
        var formData = req.body.user
        var newUser = new User({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          imageUrl: formData.imageUrl,
          honor: obj.honor,
          leaderboardPosition: obj.leaderboardPosition,
          languages: languages,
          overallKyu: obj.ranks.overall.name,
          about: formData.about
        })
        newUser.save()
          .then(user => {
            passport.authenticate('local', {
              successRedirect: '/',
              failureRedirect: '/register'
            })(req, res)
          },
            err => console.log(err)
          )
      },
        err => console.log('Username' + req.body.user.username + ' does not exist')
      )
})

module.exports = router
