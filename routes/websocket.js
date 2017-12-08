const User = require('../models/user')
const Pair = require('../models/pair')
const Chat = require('../models/chat')
module.exports = io => {

    io.on('connect', function(socket) {
      socket.on("chat message", msg => {
        // Find the pair object which is acting like chatroom.
        // console.log("msg", msg)
        // console.log("msg.chatroom", msg.chatroom)
        Pair.findById(msg.chatroom)
          .then((pair) => {
            // new message
            const chatMessage = {
              user: msg.user,
              comment: msg.comment,
              date: new Date()
            }
            // push the chat into the history array
            // console.log("FOCUS", pair)

            pair.chatMessages.push(chatMessage)

            // msg.chatroom.push(chatMessage)
            // save the new chat into pair object

            pair.save()

              .then(() => {
                // save success
                // broad cast socket chat

                let nsp = io.to(`/${msg.chatroom}`)
                nsp.emit("chat broadcast", chatMessage)
                // msg.chatoom.push(chatMessage)
                // pair.save()
              })
              .catch((err) => console.log(err))
          })
      })
    })
}
