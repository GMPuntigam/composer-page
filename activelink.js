document.addEventListener("DOMContentLoaded", function () {
  const NavigationClasses = [".navigation", ".scorelink"];
  NavigationClasses.forEach(function (item, index) {
    for (let navigationlink of document.querySelectorAll(item)) {
      navigationlink.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.currentTarget;
        for (let navigationlink of document.querySelectorAll(item)) {
          navigationlink.classList.remove("currentlyActive");
        }
        target.classList.add('currentlyActive')
      });
    }
  });
});


// for (let navigationlink of document.getElementsByClassName('navigation')) {
//   navigationlink.addEventListener('click', function (e) {
//     e = e || window.event;
//     var target = e.target;
//     for (let navigationlink of document.getElementsByClassName('navigation')) {
//       navigationlink.classList.remove("currentlyActive");
//     }
//     target.classList.add('currentlyActive')
//   });
// }


// $(function () {
//   $('.scorebutton').click(function () {
//     // this removes the underline class from all other ".navigation" links.
//     $('.scorebutton').removeClass('currentlyActive');

//     // this makes the one that was clicked underlined
//     $(this).addClass('currentlyActive');
//   });
// });


$(function () {
  $('#Into_the_void').click(function () {
    displaypdf('scores/Into_the_void.pdf')
  });
});

$(function () {
  $('#In_Jubilo').click(function () {
    displaypdf('scores/In_Jubilo.pdf')
  });
});
$(function () {
  $('#Weihnachtstanz').click(function () {
    displaypdf('scores/Weihnachtstanz.pdf')
  });
});