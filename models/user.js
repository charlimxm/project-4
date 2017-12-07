const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt') // for login and register

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  honor: Number,
  leaderboardPosition: Number,
  languages: Object,
  overallKyu: String,
  location: String,
  about: String,
  codewith: String,
  preferredLanguage: String,
  pairId: {
     type: Schema.Types.ObjectId,
     ref: 'Pair'
   }
  // chatRef: [{
  //   userId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  //   },
  //   chatRoomId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Chat'
  //   }
  // }]
})

userSchema.pre('save', function (next) {
  var user = this

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
