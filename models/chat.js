const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatSchema = new mongoose.Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comment: Array
  // comment: [
  //   {name: 'alex', chattext: 'hell'}
  // ]
})

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat
