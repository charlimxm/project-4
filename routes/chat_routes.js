const User = require('../models/user')
const Pair = require('../models/pair')
const Chat = require('../models/chat')
const express = require('express')
const router = express.Router()


router.get('/:id', (req, res) => {
  res.render('chat')
})

router.post('/', (req, res) => {
  var userOneId = req.body.userOne
  var userTwoId = req.body.userTwo
  var newPair = new Pair ({
    userOneId: userOneId,
    userTwoId: userTwoId
  })
  newPair.save()
// console.log("NEW PAIR", newPair)
  .then(() => {
    res.redirect(`/chat/${newPair._id}`)
  })
  .catch((err) => {
    console.log(err);
  })
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
