$(function() {
  $('.navigation').click(function() {
    // this removes the underline class from all other ".navigation" links.
    $('.navigation').removeClass('currentlyActive');

    // this makes the one that was clicked underlined
    $(this).addClass('currentlyActive');
  });
});

$(function() {
    $('.scorebutton').click(function() {
      // this removes the underline class from all other ".navigation" links.
      $('.scorebutton').removeClass('currentlyActive');
  
      // this makes the one that was clicked underlined
      $(this).addClass('currentlyActive');
    });
  });


$(function() {
    $('#Into_the_void').click(function() {
      displaypdf('scores/Into_the_void.pdf')
    });
  });

  $(function() {
    $('#In_Jubilo').click(function() {
      displaypdf('scores/In_Jubilo.pdf')
    });
  });
  $(function() {
    $('#Weihnachtstanz').click(function() {
      displaypdf('scores/Weihnachtstanz.pdf')
    });
  });