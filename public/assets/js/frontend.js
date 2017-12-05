$(function () {

  $('select').material_select()

  const $userSearch = $('#userSearch')
  const $userResult = $(".userResult")

  $userSearch.on('submit', e => {
    fetch('/search', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'},
      body: json
    })
    .then(response => {
      return response.json()
    })
    .then(userResult)
    .catch(err=> console.log(err))
  })

  function showResults(data){
    let allResults = data.map(user => {

      const $newUsername = $("<li>").text(user.username)
      const $newHonor = $("<li>").text(user.honor)
      const $newLeaderboardPosition = $("<li>").text(user.leaderboardPosition)
      $newHonor.append($newLeaderboardPosition)
      $newUsername.append($newHonor)
      return $newList

    })
    $userResult.html('')
    $userResult.append(allResults)
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
})
