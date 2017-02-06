
$(document).ready(function () {
  //$('.fixed-action-btn').openFAB();
  $('.modal').modal();
  $('[removeItem]').click(function () {
    event.preventDefault();
    const removeId = $(event.target).attr('data-id');
    $.ajax({
      url: '/regalos',
      type: 'delete',
      data: {id: removeId}
    })
    .done(function () {
      location = "/regalos/lista";
    })
    .fail(function () {
      location= "/error"
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