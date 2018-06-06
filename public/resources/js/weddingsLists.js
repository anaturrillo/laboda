
$(document).ready(function () {
  $('#preloader').removeClass('hide');

  let weddingsData = [];

  const addCustomContent = elem => content => $(elem).html(content);
  const addMain = addCustomContent('#presents-table');
  const addToCategories = addCustomContent('#catList');
  const addToMessage = addCustomContent('#catMessage');

  const printWeddings = function (data) {
    addMain('');

    data.map(function (item, index) {
      const template = $('#wedding-tr').find('tr')
        .html()
        .replace(/:id/g, item.id)
        .replace(/:category/g, item.category)
        .replace(/:name/g, item.name)
        .replace(/:description/g, item.description)
        .replace(/:image/g, item.image)
        .replace(/:price/g, item.price)
        .replace(/:status/g, item.status);

      $('#weddings-table').append(`<tr class="weddingRow${item.id}">`+ template + '</tr>');
    });
  };

  // BUSCA LOS REGALOS
  $.ajax({
    url: `/boda/lista`,
    crossDomain: true
  })
    .done(function (resp) {
      const weddings = resp.weddings;
      $('#preloader').addClass('hide');

      if (weddings.length === 0) {
        addMain('<p>No hay regalos disponibles</p>');
      } else {
        weddingsData = weddings;
        printWeddings(weddings);
      }
    })
    .fail(function (err) {
      console.error(err);
      window.location = 'error'
    });

});