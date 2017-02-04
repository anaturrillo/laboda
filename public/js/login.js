
$(document).ready(function () {
  $('#login').submit(function (evt) {
    event.preventDefault();

    const formData = $(this)
        .serializeArray()
        .reduce(function (obj, e) {
            obj[e.name] = e.value;
            return obj
          }, {});
    const cookies = req
        .headers
        .cookie
        .replace(' ', '')
        .split(';')
        .reduce( (obj,e) => {
          const splitted = e.split('=');
          obj[splitted[0]] = splitted[1];
          return obj }, {} );

    if (!cookies.token) {
      $.post('/api/login', formData)
          .done(function (resp) {
            document.cookie= "token=" + resp.token;
            window.location = '/regalos-disponibles'
          })
          .fail(function (err) {
            alert('No autorizado');
            console.log(err)
          });
    } else {
      window.location = '/regalos-disponibles'
    }



  })
});