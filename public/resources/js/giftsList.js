
$(document).ready(function () {
  $('#preloader').removeClass('hide');

  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('select').material_select();

  let presentsData = [];
  let filteredData = [];

  const addCustomContent = elem => content => $(elem).html(content);
  const addMain = addCustomContent('#gift-table');

  const printGifts = function (data) {
    addMain('');

    data.map(function (item, index) {
      const template = $('#gift-tr').find('tr')
          .html()
          .replace(/:gift/g, item.name)
          .replace(/:category/g, item.category)
          .replace(/:name/g, item.fromName)
          .replace(/:message/g, item.message);

      $('#gifts-table').append('<tr>' + template + '</tr>');
    });
  };

  $.ajax({
    url: '/regalos/regalados'
  })
  .done(function (gifts) {
    $('#preloader').addClass('hide');

    if (gifts.length == 0) {
      addMain('<p>No hay regalos disponibles</p>');
    } else {
      printGifts(gifts);
    }
  })
  .fail(function (err) {
    window.location = '/error.html'
  });

});