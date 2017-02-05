
$(document).ready(function () {
  //$('.fixed-action-btn').openFAB();
  $('.modal').modal();
  $('#removeItem').click(function () {
    event.preventDefault();
    const removeId = $('#removeItem').attr('data-id');
    $.ajax({
      url: '/api/present',
      type: 'DELETE',
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
    debugger
    document.cookie = '';
  })

});