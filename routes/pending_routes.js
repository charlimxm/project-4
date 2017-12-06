const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pending')
})

// router.post('/search', (req, res) => {
//   const keyword = req.body.keyword
//   const regex = new RegExp(`${keyword}`, 'i')
//   console.log(keyword)
//   console.log('fetched')
//
//   User.find({
//     "languages.lang": regex
//   })
//   .sort({ "languages.kyu": 1 })
//   .then(data => res.send(data))
//   .catch(err => console.log('err')) // in case we have an error
// })

module.exports = router



















module.exports = router
