const User = require('../models/user')
const Pair = require('../models/pair')
const Chat = require('../models/chat')
const express = require('express')
const router = express.Router()


router.get('/:id', (req, res) => {

  const io = req.socket

  io.of(`/${req.params.id}`).on('connect', function(socket) {
    console.log('new connection!')
    socket.on("chat message", msg => {
      // Find the pair object which is acting like chatroom.
      Pair.findById(msg.chatroom)
        .then((pair) => {
          // new message
          const chatMessage = {
            user: msg.user,
            comment: msg.comment,
            date: new Date()
          }
          // push the chat into the history array
          pair.chatMessages.push(chatMessage)
          // save the new chat into pair object
          pair.save()
            .then(() => {
              // save success
              // broad cast socket chat

              let nsp = io.of(`/${msg.chatroom}`)
              nsp.emit("chat broadcast", chatMessage)
            })
            .catch((err) => console.log(err))
        })
    })
  })

  // retrieve history
  // find the pair based on :id
  Pair.findById(req.params.id)
    .then((pair) => {
      // the history array
      const chat = pair.chatMessages
      // console.log(pair)
      res.render('chat', {chat,
                          pairId: req.params.id})
    })

})

router.post('/', (req, res) => {
  var userOneId = req.body.userOne
  var userTwoId = req.body.userTwo
  // check the existence the pair
  Pair.find({"userTwoId": userTwoId})
    .then((chatroomList) => {
      // if not(no chatroom), create new pair and save.
      if (chatroomList.length === 0) {
        // create new pair(chatroom)
        var newPair = new Pair ({
          userOneId: userOneId,
          userTwoId: userTwoId
        })
        // save the new one
        newPair.save()
          .then(() => {
            // if the saving is success
            // find the saved pair(chatroom)
            Pair.find({"userTwoId": userTwoId})
            .then((chatroomList) => res.redirect(`/chat/${chatroomList[0]._id}`))
          })
      } else {
        res.redirect(`/chat/${chatroomList[0]._id}`)
      }
    })
    .catch((err) => console.log('err'))
})

module.exports = router
