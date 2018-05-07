
$(document).ready(function () {
  const weddingId = window.location.pathname.split('/')[2];
  const route = `/boda/${weddingId}`;

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
          .replace(/modalId/g, 'confirmation-' + index)
          .replace(/:id/g, item.id)
          .replace(/:image/g, item.image)
          .replace(/:name/g, item.name)
          .replace(/:description/g, item.description)
          .replace(/:url/g, item.url)
          .replace(/:price/g, item.price)
          .replace(/:transactionId/g, item.transaction_id)
          .replace(/message/g, 'message' + index)
          .replace(/fromName/g, 'fromName' + index)
          .replace(/:index/g, index);

      $('#present-content').append(template);
      $('.modal').modal();
    });
  };

  $.ajax({
    url: `${route}/regalos/disponibles`,
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
    window.location = 'error';
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
  });

  $('#present-content').on('click', '[buyPresent]', function() {
    event.preventDefault();
    const buyUrl = $(this).attr('data-url');
    const itemIndex = $(this).attr('data-index');
    const fromName = $('#fromName' + itemIndex);
    const message = $('#message' + itemIndex);
    if (!fromName.val()) {
      fromName.addClass('error')
    } else {

      const giftData = {
        fromName: fromName.val(),
        message: message.val().replace(/\n\r?/g, '<br />'),
        present_id: $(this).attr('data-id'),
        transaction_id: $(this).attr('data-transactionId')
      };

      $.ajax({
        url: `${route}/regalos/regalados`,
        type: 'POST',
        data: giftData
      })
      .done(function (data) {
        console.log(data)
        $('#confirmation-' + itemIndex)
            .html('' +
                '<div class="thanks-message">' +
                '<p class="red-text text-accent-4 bold" >GRACIAS POR TU REGALO!!</p>' +
                '<p>Ahora vamos a redirigirte a MercadoPago para que puedas concretar la transacción.</p>' +
                '</div>')
            .promise()
            .done(function () {
              setTimeout(function () {
                window.location = buyUrl
              }, 1500)
            });
      })
      .fail(function (err) {
        window.location = 'error';
        console.log('fallo post /regalos/regalados')
      });
    }
  });
});