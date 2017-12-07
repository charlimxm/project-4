const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  if (!req.user.location) {
  res.redirect(`/profile/${req.user.username}`)
} else {
  User.find({
     "username" : { $ne : req.user.username},
      "location": req.user.location,
      "overallKyu": req.user.overallKyu,
      "preferredLanguage": req.user.preferredLanguage
    }
  )
    .then(matchedUser => {
      res.render('dashboard', {
        matchedUser
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})

module.exports = router
