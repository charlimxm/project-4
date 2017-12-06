const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('chat')
  // var user = req.user
  // res.render('chat')
})

// router.put('/:id', (req, res) => {
//   var formData = req.body
//   User.findByIdAndUpdate(req.params.id, {
//     email: formData.email
//   })
//   .then(() => res.redirect(`/profile`))
//   .catch(err => console.log(err))
// })
//
// router.delete('/:id', (req, res) => {
//   User.findByIdAndRemove(req.params.id)
//   .then(() => res.redirect(`/`))
//   .catch(err => console.log(err))
// })

module.exports = router
