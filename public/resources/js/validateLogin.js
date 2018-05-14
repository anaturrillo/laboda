(function () {
  const weddingId = window.location.pathname.split('/')[2];
  const cookieObject = document
    .cookie
    .replace(/ /g, '')
    .split(';')
    .reduce((obj, e) => {
      const splitted = e.split('=');
      obj[splitted[0]] = splitted[1];
      return obj
    }, {});

  if (cookieObject.token) {
    $.ajax({
      url: `/boda/${weddingId}/validate`
    })
      .done(function (response) {
        if (response.forbidden) window.location = `login`;
        $('.loader').fadeOut();
      })
      .fail(function (err) {
        console.log(err);
        window.location = 'error'
      });
  } else {
    window.location = `login`;
  }

})();