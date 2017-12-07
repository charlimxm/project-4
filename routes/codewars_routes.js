const User = require('../models/user')
const express = require('express')
const router = express.Router()

var rp = require('request-promise')

router.put('/:id', (req, res) => {
  console.log(req)
  var languages = {}
  var options = {
    method: 'GET',
    uri: 'https://www.codewars.com/api/v1/users/' + req.user.username,
    json: true // Automatically parses the JSON string in the response
  }
  // res.send('https://www.codewars.com/api/v1/users/' + req.body.slug)
  rp(options)
    .then(
      function(obj) {
        var arr = []
        var languages = obj.ranks.languages
        for (x in languages) {
          var langs = {
            lang: x,
            kyu: languages[x].name.replace(' kyu', '')
          }
          arr.push(langs)
        }
        User.findByIdAndUpdate(req.user.id, {
            honor: obj.honor,
            leaderboardPosition: obj.leaderboardPosition,
            languages: arr,
            overallKyu: obj.ranks.overall.name
          })
          .then(() => res.redirect(`/profile/${req.user.username}`))
          .catch(err => console.log(err))
      })

})

module.exports = router
