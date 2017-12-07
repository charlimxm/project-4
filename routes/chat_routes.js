const User = require('../models/user')
const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
  res.render('chat')
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
