$('document').ready(function () {
  $('.new-artist').submit(function (event) {
    event.preventDefault()
    var bandName = $('input[placeholder=name]').val();
    var genre = $('input[placeholder=genre]').val();
    var submitData = {
      name: bandName,
      genre: genre
    }

    $.post('/newartist', submitData, function () {
      location.reload()
    })
  })
})


