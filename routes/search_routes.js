const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('search') //
})

router.post('/', (req, res) => {
  var formData = req.body
  console.log(formData)
})




















module.exports = router
