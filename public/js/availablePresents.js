
$(document).ready(function () {

  $.ajax({
    url: '/regalos/disponibles',
    type: 'GET'
  })
  .done(function (data) {
    $('#present-content').html('');

    const content = data
        .map(function (item, index) {
          let template = '';
          if(index%3 == 0) template += '<div class="row">';

          template += $('#present-card')
              .html()
              .replace(/:image/g, item.image)
              .replace(/:name/g, item.name)
              .replace(/:description/g, item.description)
              .replace(/:url/g, item.url)
              .replace(/:price/g, item.price);

          if(index%3 == 0) template += '</div>';

          $('#present-content').append(template);
        });


  })
  .fail(function () {
    console.log('fallo get /regalos/lista')
  });

});