const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('search') //
})

router.post('/', (req, res) => {
  var selectedLanguage = req.body.searchLanguage
  console.log(selectedLanguage);

  User.find({
    "languages.lang": selectedLanguage
  }).sort({ "languages.kyu": 1 })
  .then(data => {
    res.render('search')
    console.log(data)
  })
})

module.exports = router
