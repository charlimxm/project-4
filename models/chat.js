const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ChatSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  date: Date,
  acceptedPearingId: {
    Schema.Types.ObjectId,
    ref: 'Accepted Pearing'
  }
})

const Chat = mongoose.model("Chat", ChatSchema)

module.exports = Chat
