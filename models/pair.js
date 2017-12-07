const mongoose = require('mongoose');
const Schema = mongoose.Schema

const chatSchema = new mongoose.Schema({
  user: String,
  comment: String,
  date: Date
})

const pairSchema = new Schema({
  userOneId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  userTwoId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  chatMessages: [chatSchema]
})

const Pair = mongoose.model("Pair", pairSchema)

module.exports = Pair
