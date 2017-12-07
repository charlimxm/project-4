const User = require('../models/user')
const Pair = require('../models/pair')
const express = require('express')
const router = express.Router()


router.get('/:id', (req, res) => {
  res.render('chat')
  // console(Pair._id)
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

router.put('/', (req, res) => {
  
})

// Socket events
// module.exports = io => {
  // io.on('connection', function(socket){
  //   // console.log('a user connected')
  //   socket.on('broadcast chat', (msg) => {
  //     io.emit("chat message", msg)
  //   })
  // })
// }

// let nsp = io.of(`/${msg.chatId}`)
// nsp.emit("chat message", {
//   user: msg.user,
//   message: msg.message
// })
//
// //save to mongoose
// let newChat = new Chat({
//   author: msg.user,
//   comment: msg.message,
//   pairId: msg.pairId,
//   date: Date.now()
// })
// newChat.save()
// })
// })
// }
module.exports = router
