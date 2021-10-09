$(function() {
  $('.navigation').click(function() {
    // this removes the underline class from all other ".navigation" links.
    $('.navigation').removeClass('currentlyActive');

    // this makes the one that was clicked underlined
    $(this).addClass('currentlyActive');
  });
});

$(function() {
    $('#Into_the_void').click(function() {
      // this removes the underline class from all other ".navigation" links.
      displaypdf(Into_the_void.pdf)
    });
  });

  $(function() {
    $('#In_Jubilo').click(function() {
      // this removes the underline class from all other ".navigation" links.
      displaypdf(In_Jubilo.pdf)
    });
  });