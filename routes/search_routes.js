const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("We are the Champions") //
})

router.put('/:id', (req, res) => {
  var formData = req.body
  console.log(formData)
})





 














module.exports = router
