const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pairSchema = new Schema({
  userOneId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  userTwoId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Pair = mongoose.model("Pair", pairSchema)

module.exports = Pair
