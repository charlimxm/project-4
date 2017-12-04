const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt') // for login and register

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  gender: String,
  email: String,
  password: String,
  
})

userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('pre save flow', user)
    next()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
