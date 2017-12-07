const User = require('../models/user')
const Pair = require('../models/pair')
const Chat = require('../models/chat')
const express = require('express')
const router = express.Router()

const ObjectId = require('mongoose').Types.ObjectId


router.get('/:id', (req, res) => {

  const io = req.socket
  io.on('connection', function(socket) {
    socket.join(`/${req.params.id}`)
    console.log('room join to : ', req.params.id)
  })


  // retrieve history
  // find the pair based on :id
  // return res.send(req.user.id)
  Pair.find({
    $or: [
      { 'userOneId': ObjectId(req.params.id) },
      { 'userTwoId': ObjectId(req.params.id) }
    ]
  }).then((pair) => {
    // the history array
    // console.log(pair)
    const chat = pair.chatMessages
    // console.log(chat)
    res.render('chat', {chat,
                        pairId: req.params.id})
  })


})

router.post('/', (req, res) => {
  var userOneId = req.body.userOne
  var userTwoId = req.body.userTwo
  // check the existence the pair
  Pair.find({
    $or: [
      { 'userOneId': new ObjectId(req.params.id) },
      { 'userTwoId': new ObjectId(req.params.id) }
    ]
  })
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
            Pair.find({
              $or: [
                { 'userOneId': new ObjectId(req.params.id) },
                { 'userTwoId': new ObjectId(req.params.id) }
              ]
            })
            .then((chatroomList) => res.redirect(`/chat/${chatroomList[0]._id}`))
          })
      } else {
        res.redirect(`/chat/${chatroomList[0]._id}`)
      }
    })
    .catch((err) => console.log('err'))
})

module.exports = router
