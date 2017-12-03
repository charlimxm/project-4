$(function () {

  $('select').material_select()

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
