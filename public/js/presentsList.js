
$(document).ready(function () {
  //$('.fixed-action-btn').openFAB();
  $('.modal').modal();

  $.ajax({
    url: '/regalos/lista'
  })
  .done(function (data) {

    if (data.length == 0) {
      $('#present-content').html('<p>No hay regalos disponibles</p>');
    } else {
      $( "#presents-table" ).html('');

      const content = data
          .map(function (item, index) {
            const template = $('#present-tr').find('tr')
                .html()
                .replace(/:id/g, item.id)
                .replace(/:category/g, item.category)
                .replace(/:name/g, item.name)
                .replace(/:description/g, item.description)
                .replace(/:image/g, item.image)
                .replace(/:price/g, item.price)
                .replace(/:status/g, item.status);

            $('#presents-table').append('<tr>' + template + '</tr>');
          });
    }
  })
  .fail(function (err) {
    window.location = '/error.html'
  });

  $('#presents-content').on('click', 'td', function () {
    event.preventDefault();
    const removeId = $(event.target).attr('data-id');
    $.ajax({
      url: '/regalos',
      type: 'delete',
      data: {id: removeId}
    })
    .done(function () {
      location = "/lista.html";
    })
    .fail(function () {
      location= "/error.html"
    })
  });

  $("[close-session]").click(function () {
    event.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = '/'
  });

  $("[uploadPresent]").click(function () {
    const data = $('form').serializeArray();
    if (data.every(e => e.value)) {
      $('[submitForm]').click()
    }
  })

});