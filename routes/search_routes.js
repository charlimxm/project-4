const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('search') //
})

router.post('/', (req, res) => {
  var selectedLanguage = req.body.searchLanguage

  User.find({
    "languages.lang": selectedLanguage
  }).sort({ "languages.kyu": 1 })
  .then(data => {
    console.log(data)
    res.send(data)
  })
  .catch((err) => console.log(err))
})

module.exports = router
