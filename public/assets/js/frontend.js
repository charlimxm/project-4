$(function () {
  const $searchInput = $('#searchInput')
  const $userResult = $(".userResult")


  $searchInput.on('keyup', e => { // e is the event object of the keyup event
    var keyword = e.target.value
    if(keyword.length > 0) {
    var json = JSON.stringify({
      keyword
    })

    fetch('/search', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: json
    })
    .then(response => response.json())
    .then(data => showResults(data))
    .catch(err=> console.log(err))
  }
  })

  function showResults(data){
    let allUsers = data.map(user => {

      const $newUsername = $("<h5>").text(user.username)
      const $newHonor = $("<h5>").text(user.honor)

      $newUsername.append($newHonor)
      return $newUsername

      const $newCol = $('<div class="col-4">')
      const $newCard = $('<div class="card">')

      const $newCardBody = $('<div class="card-body">')

      const $newAvatar = $('<div class="avatar">')
      const $newCardTitle = $('<h4 class="card-title">')

      // const languages = $.each(user.languages, function(i, val) {
      //   $('<p class="card-text">').text(val)
      // }

      const bodyText = '<p>Codewars Rank</p>' +
                      `<p>Honor : ${user.honor}</p>` +
                      `<p>Overall Kyu :  ${user.overallKyu} </p>` +
                      `<p>Leaderboard Position :  ${user.leaderboardPosition} </p>` +
                      `<p>${user.about} </p>` +
                      `<p> ${user.codewith} </p>`

      $newCardTitle.text(user.username)
      $newAvatar.append('<img src="{{user.imageUrl}}" />')
        $newCardBody.append(bodyText)

      $newCardBody.append($newAvatar, $newCardTitle, $newCardBody)

      $newCard.append($newCardBody)
      $newCol.append($newCard)
      return $newCol


    })
    $userResult.html('')
    $userResult.append(allUsers)
  }

  const $deleteForm = $('.deleteForm')

  $deleteForm.on('submit', function (e) {
    e.preventDefault()

    var form = $(this)
    var formData = form.serializeArray()
    var restoId = formData[0].value
    var json = JSON.stringify({
      restoId
    })

    console.log(`delete this user ${userId}`)
    console.log(json)

    fetch('/deleteuser', {
      method: 'DELETE',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log('manipulate the dom now')
      form.parents('.col-4').remove()
    })
  })





    // Socket events
    // Click events
    var userPairId = $("#userPairId").val()
    var socket = io('/')
    socket = io(`/${userPairId ? userPairId : ''}`)
    console.log('loaded')
    $('#chat').submit(function(){

      socket.emit('chat message', {
        user: $("#userName").val(),
        comment: $('#m').val(),
        chatroom: $("#userPairId").val()
      })
      $('#m').val('')

      return false
    })

    socket.on("chat broadcast", function(msg) {
      console.log('chaT!!!!!')
      $("#message").append(
        $(`<li class='flow-text chatMessage'>${msg.user}: ${msg.comment}</li>`)
      )
      window.scrollTo(0, document.body.scrollHeight)
    })

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
      log(data.username + ' joined')
      addParticipantsMessage(data)
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
      log(data.username + ' left');
      addParticipantsMessage(data);
      removeChatTyping(data);
    })

})
