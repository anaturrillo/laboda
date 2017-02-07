
$(document).ready(function () {
  $('#preloader').removeClass('hide');

  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('select').material_select();

  let presentsData = [];

  const addCustomContent = elem => content => $(elem).html(content);
  const addMain = addCustomContent('#presents-table');
  const addToCategories = addCustomContent('#catList');
  const addToMessage = addCustomContent('#catMessage');

  const printPresents = function (data) {
    addMain('');

    data.map(function (item, index) {
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
  };

  const printCategories = function (data) {
    addToCategories('');

    addToCategories(data
        .reduce(function (cont, e) {
          cont += '<div class="chip">' + e.name + '</div>';
          return cont
        }, ''));

    $('#category').append(data
        .reduce(function (cont, e) {
          cont += '<option value="' + e.name + '">' + e.name + '</option>';
          return cont
        }, ''))
  };

  // BUSCA LOS REGALOS
  $.ajax({
    url: '/regalos/lista'
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
    window.location = '/error.html'
  });

  // BUSCA LAS CATGORIAS
  $.ajax({
    url: '/regalos/categorias'

  })
  .done(function (data) {
    if (data.length == 0) {
      addToCategories('No hay categorías cargadas');
    } else {
      printCategories(data);
    }

  })
  .fail(function (err) {

    window.location = '/error.html'

  });

  // BORRA REGALOS
  $('#presents-content').on('click', 'td', function () {
    event.preventDefault();
    const removeId = $(event.target).attr('data-id');

    if(removeId){
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
    }
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

  $('#addNewCategory').click(function () {
    event.preventDefault();
    const catName = $('#categoryName').val();
    if (!catName) {
      catName.addClass('error');
    } else {
      $.ajax({
        url: '/regalos/categorias',
        type: 'post',
        data: {name: catName}

      }).done(function () {
        $('#catList').append('<div class="chip">' + catName + '</div>');
        $('#categoryName').val('')
      }).fail(function () {
        addToMessage('Ups, parece que no se pudo agregar la catagoria')
      })
    }
  })

});