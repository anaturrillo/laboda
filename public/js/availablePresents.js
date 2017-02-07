
$(document).ready(function () {
  $('#preloader').removeClass('hide');
  $('select').material_select();

  let presentsData = [];

  const addCustomContent = elem => content => $(elem).html(content);
  const addMain = addCustomContent('#present-content');

  const printPresents = function(data){
    addMain('');

    data.map(function (item, index) {
      let template = '';

      template += $('#present-card')
          .html()
          .replace(/:id/g, item.id)
          .replace(/:image/g, item.image)
          .replace(/:name/g, item.name)
          .replace(/:description/g, item.description)
          .replace(/:url/g, item.url)
          .replace(/:price/g, item.price);

      $('#present-content').append(template);
    });
  };


  $.ajax({
    url: '/regalos/disponibles',
    type: 'GET'
  })
  .done(function (data) {
    $('#preloader').addClass('hide');

    if (data.length == 0) {
      addMain('<p>No hay regalos disponibles</p>');
    } else {
      presentsData = data;
      printPresents(data);
    }
  })
  .fail(function (err) {
    window.location = '/error.html';
    console.log('fallo get /regalos/lista')
  });

  $('#filterByPrice').change(function () {
    const selected = $('#filterByPrice').val();

    const filters = {
      _100_500: e => e.price > 100 && e.price <= 500,
      _500_1000: e => e.price > 500 && e.price <= 1000,
      _1000_3000: e => e.price > 1000 && e.price <= 3000,
      _3000_1500: e => e.price > 3000 && e.price <= 15000,
      _15000_: e => e.price > 15000,
      all: e => e,
    };

    if (presentsData && selected) {
      const results = presentsData.filter(filters[selected]);
      if(results.length) {
        printPresents(results);
      } else {
        addMain('No hay ningún regalo en este rango de precios.')
      }
    }
  })

});