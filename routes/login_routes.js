const User = require('../models/user')
const express = require('express')
const router = express.Router()

const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

module.exports = router
