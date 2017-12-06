const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  var user = req.user
  res.render('recommendation')
})
