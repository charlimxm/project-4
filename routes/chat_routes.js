const User = require('../models/user')
const Chat = require('../models/chat')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('chat')
})

module.exports = io => {
  io.on("connection", function(socket) {
    socket.on("chat message", msg => {
      let nsp = io.of(`/${msg.pairId}`)
      nsp.emit("chat message", {
        user: msg.user,
        message: msg.message
      })

      let newChat = new Chat({
        user: msg.user,
        comment: msg.message,
        date: Date.now(),
        chatroom: msg.pairId
      })
      newChat.save()
    })
  })
}

module.exports = router
