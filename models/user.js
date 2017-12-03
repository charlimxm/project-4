const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  // codewars_username: String,
  gender: String,
  details: String
})


const User = mongoose.model('User', userSchema)

module.exports = User
