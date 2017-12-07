const User = require('../models/user')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  if (!req.user.location || !req.user.preferredLanguage) {
    // var errorMsg = "please specify preferred location and language to go to dashboard"
  res.redirect('/')
} else {
  User.find({
      "username" : { $ne : req.user.username},
      "location": req.user.location,
      "overallKyu": req.user.overallKyu,
      "preferredLanguage": req.user.preferredLanguage,
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
