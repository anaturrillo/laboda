(function () {
  const weddingId = window.location.pathname.split('/')[2];

  $('#uploadPresentForm').attr('action', `/boda/${weddingId}/regalos`);

  $("[close-session]").click(function () {
    event.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
    window.location = '/'
  });

  $("[uploadPresent]").click(function () {
    const data = $('form').serializeArray();

    if (data.every(e => e.value)) {
      $('[submitForm]').click()
    }
  });


})();