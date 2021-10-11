var pdftarget = "Into_the_void.pdf"

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
        target.classList.add('currentlyActive');
        currentstring = e.currentTarget.innerText.replaceAll(' ', '_') + '.pdf';
        if (currentstring != pdftarget && item == '.scorelink') {
          pdftarget = currentstring;
          displaypdf('scores/' + pdftarget);
        }

      });
    }
  });

  document.getElementById('play-icon0').addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.currentTarget;
    if (target.classList.contains('currentlyActive')) {
      displaypdf('scores/Into_the_void.pdf')
    }
  });

  document.getElementById('play-icon1').addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.currentTarget;
    if (target.classList.contains('currentlyActive')) {
      displaypdf('scores/In_Jubilo.pdf')
    }
  });

  document.getElementById('play-icon2').addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.currentTarget;
    if (target.classList.contains('currentlyActive')) {
      displaypdf('scores/Weihnachtstanz.pdf')
    }
  });
});
//   document.getElementById('Into_the_void').addEventListener('click', function (e) {
//     displaypdf('scores/Into_the_void.pdf')
//   });

//   document.getElementById('In_Jubilo').addEventListener('click', function (e) {
//     displaypdf('scores/In_Jubilo.pdf')
//   });

//   document.getElementById('Weihnachtstanz').addEventListener('click', function (e) {
//     displaypdf('scores/Weihnachtstanz.pdf')
//   });
// 

