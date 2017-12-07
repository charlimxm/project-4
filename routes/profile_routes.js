const User = require('../models/user')
const express = require('express')
const router = express.Router()

var rp = require('request-promise')

// router.get('/', (req, res) => {
//   res.render('profile', req.user)
// })

router.get('/:username', (req, res) => {
  var person = req.params.username
  User.findOne({
      'username': person
    })
    .then(person => {
      res.render('profile', {
        person
      })
    })
    .catch(err => console.log(err))
})



router.put('/:id', (req, res) => {
  var formData = req.body
  User.findByIdAndUpdate(req.params.id, {
      email: formData.email,
      about: formData.about,
      codewith: formData.codewith,
      location: formData.location,
      preferredLanguage: formData.preferredLanguage
    })
    .then(() => res.redirect(`/profile/${req.body.slug}`))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

module.exports = router
