
$(document).ready(function () {
  const weddingId = window.location.pathname.split('/')[2];
  const route = `/boda/${weddingId}`;

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

      $('#presents-table').append(`<tr class="presentRow${item.id}">`+ template + '</tr>');
    });
  };

  const printCategories = function (data) {
    addToCategories('');

    addToCategories(data
        .reduce(function (cont, e) {
          cont += '<div class="chip">' + e.name + '</div>';
          return cont
        }, ''));

    $('select').material_select('destroy');

    $('.categorySelect').append(data
        .reduce(function (cont, e) {
          cont += '<option value="' + e.name + '">' + e.name + '</option>';
          return cont
        }, '') + '<option value="all">ver todas</option> ');

    $('select').material_select();
  };

  // BUSCA LOS REGALOS
  $.ajax({
    url: `${route}/regalos/lista`,
    crossDomain: true
  })
  .done(function (resp) {
    if (resp.forbidden) window.location = 'login';
    const presents = resp.presents;
    $('#preloader').addClass('hide');

    if (presents.length === 0) {
      addMain('<p>No hay regalos disponibles</p>');
    } else {
      presentsData = presents;
      printPresents(presents);
    }
  })
  .fail(function (err) {
    console.error(err);
    window.location = 'error'
  });

  // BUSCA LAS CATEGORIAS
  $.ajax({
    url: `${route}/regalos/categorias`
  })
  .done(function (categories) {
    if (categories.length === 0) {
      addToCategories('No hay categorías cargadas');
    } else {
      printCategories(categories);
    }

  })
  .fail(function (err) {
    console.error(err);
    window.location = 'error'

  });

  // BORRA REGALOS
  $('#presents-content').on('click', 'td', function () {
    event.preventDefault();
    const removeId = $(event.target).attr('data-id');

    if(removeId){
      $(`.presentRow${removeId}`).fadeOut();

      $.ajax({
        url: `${route}/regalos`,
        type: 'delete',
        data: {id: removeId}
      })
      .done(function () {
        $('.undo').fadeIn();
        $('.undo p .removeId').html(removeId);
        $('.undo p a').attr('data-id', removeId);
        let duration = 4;
        setInterval(function () {
          if (duration > 0) $('.timer').html(duration);
          duration -= 1
        }, 1000);

        setTimeout(function () {
          $('.undo').fadeOut();
          location = 'lista';
        }, 5000);


      })
      .fail(function () {
        location= "error"
      })
    }
  });

  // RESTAURA REGALOS
  $('#undo').click(function () {
    event.preventDefault();
    const removeId = $(event.target).attr('data-id');

    $.ajax({
      url: `${route}/regalos`,
      type: 'patch',
      data: {id: removeId, present: {deleted: 'N'}}
    })
      .done(function () {
        $('.undo').fadeOut();
        location = 'lista'
      })
      .fail(function () {
        location= "error"
      })
  });

  $('#filterByPrice').change(function () {
    const selected = $('#filterByPrice').val();

    const byPriceRange = {
      _100_500: e => e.price > 100 && e.price <= 500,
      _500_1000: e => e.price > 500 && e.price <= 1000,
      _1000_3000: e => e.price > 1000 && e.price <= 3000,
      _3000_1500: e => e.price > 3000 && e.price <= 15000,
      _15000_: e => e.price > 15000,
      all: e => e,
    };

    if (presentsData.length && selected) {
      const results = presentsData.filter(byPriceRange[selected]);
      if(results.length) {
        printPresents(results);
      } else {
        addMain('No hay ningún regalo en este rango de precios.')
      }
    }
  });

  $('#filterByCategory').change(function () {
    const selected = $('#filterByCategory').val();
    const byCategory = selectedCategory => e => {
      if(selectedCategory == 'all') return e
      return e.category == selectedCategory
    };

    if (presentsData.length && selected) {
      const results = presentsData.filter(byCategory(selected));
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
      $('#categoryName').addClass('error');
    } else {
      $.ajax({
        url: `${route}/regalos/categorias`,
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