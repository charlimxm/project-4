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
        var arr = []
        var languages = obj.ranks.languages
        for (x in languages) {
          var langs = {
            lang: x,
            kyu: languages[x].name.replace(' kyu','')
          }
          arr.push(langs)
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
          languages: arr,
          overallKyu: obj.ranks.overall.name,
          about: formData.about,
          codewith: formData.codewith,
        })
        newUser.save()
        .then(user => {
                  passport.authenticate('local', {
                    successRedirect: `/profile/${user.username}`,
                    failureRedirect: '/register'
                  })(req, res)
                },
                  err => console.log(err)
                )
            },
              err => console.log('Username' + req.body.user.username + ' does not exist')
            )
      })





//
//         newUser.save()
//           .then(user => {
//             passport.authenticate('local', {
//               successRedirect: `/profile/${user.username}`,
//               failureRedirect: '/register'
//             })(req, res)
//           }),
//             err => console.log(err)
//       }).catch(err => res.send(err))
//         // err => console.error(err)
// })

module.exports = router
