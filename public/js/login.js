
$(document).ready(function () {

  $('#login').submit(function (evt) {
    event.preventDefault();


    const formData = $(this)
        .serializeArray()
        .reduce(function (obj, e) {
            obj[e.name] = e.value;
            return obj
          }, {});


    $.post('/login', formData)
          .done(function (resp) {
            document.cookie= "token=" + resp.token;
            window.location = '/lista.html'
          })
          .fail(function (err) {
            alert('No autorizado');
            console.log(err)
          });



  })
});