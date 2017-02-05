
$(document).ready(function () {
  const cookie = document
      .cookie
      .replace(' ', '')
      .split(';')
      .reduce( (obj,e) => {
        const splitted = e.split('=');
        obj[splitted[0]] = splitted[1];
        return obj }, {} );

  if (cookie.token) window.location = '/lista';

  $('#login').submit(function (evt) {
    event.preventDefault();


    const formData = $(this)
        .serializeArray()
        .reduce(function (obj, e) {
            obj[e.name] = e.value;
            return obj
          }, {});


    $.post('/api/login', formData)
          .done(function (resp) {
            document.cookie= "token=" + resp.token;
            window.location = '/lista'
          })
          .fail(function (err) {
            alert('No autorizado');
            console.log(err)
          });



  })
});