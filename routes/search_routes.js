const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('search') //
})

<<<<<<< HEAD
// search function
router.put('/:id', (req, res) => {
  var formData = req.body
  console.log(formData)
})


router.put('/:id', (req, res) => {
  var formData = req.body
  console.log(formData)
})






<<<<<<< HEAD
=======

>>>>>>> 54dccca10d339fdf8777d3b0543bc3f525837d56














module.exports = router
