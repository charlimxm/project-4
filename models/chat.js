const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatSchema = new mongoose.Schema({
  user: String,
  comment: String,
  date: Date,
  chatroom: [{
    type: Schema.Types.ObjectId,
    ref: 'Pair'
  }]
  // comment: [
  //   {name: 'alex', chattext: 'hell'}
  // ]
})

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat
