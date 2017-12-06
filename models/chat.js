const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ChatSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  date: Date
})

const Chat = mongoose.model("Chat", ChatSchema)

module.exports = Chat
