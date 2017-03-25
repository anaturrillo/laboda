
$(document).ready(function () {
  $('#preloader').removeClass('hide');

  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('select').material_select();

  let presentsData = [];
  let filteredData = [];
  let giftsData = null;

  const addCustomContent = elem => content => $(elem).html(content);
  const addMain = addCustomContent('#gift-table');

  const printGifts = function (data) {
    addMain('');

    data.map(function (item, index) {
      const template = $('#gift-tr').find('tr')
          .html()
          .replace(/:gift/g, item.presentName)
          .replace(/:category/g, item.category)
          .replace(/:name/g, item.fromName)
          .replace(/:message/g, item.message);

      $('#gifts-table').append('<tr>' + template + '</tr>');
    });
  };

  $.ajax({
    url: '/regalos/regalados'
  })
      .done(function (presents) {
        $('#preloader').addClass('hide');

        if (presents.length == 0) {
          addMain('<p>No hay regalos disponibles</p>');
        } else {
          giftsData = presents;
          printGifts(presents);
        }
      })
      .fail(function (err) {
        window.location = '/error.html'
      });

});