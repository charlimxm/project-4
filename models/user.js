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
  password: String,
  gender: String,
  imageUrl: String,
  honor: Number,
  leaderboardPosition: Number,
  languages: Object,
  overallKyu: String,
  about: String,
  languages: Object,
  // languages: [
  //   { lang: String,
  //     kyu: String }
  // ],
  rejectedPearing: Object,  // will store ids here
  /*
    {
      'dfskjhgskldfghlksd': true
    }

    user.rejected[id that you found]
  */
  /*
  pending: Array,
  invited: Array,
  accepted: Array,
  */
  /*
  connecting: Array
    // [{
    id: aishdklahskd,
    name: Alex,
    status: pending
  }]
  */
  invitedPearing: Object,
  pendingPearings: Object,
  acceptedPearing: Array,
  location: String
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
