const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  User.find({ })
  .then(data => {
    console.log(data)
    res.render('search', data)
  })
})

// router.post('/', (req, res) => {
//   const selectedLanguage = req.body.searchLanguage
//
//   User.find({
//     "languages.lang": selectedLanguage
//   }).sort({ "languages.kyu": 1 })
//   .then(data => {
//     console.log(data)
//     res.render(data)
//   })
// })

module.exports = router
