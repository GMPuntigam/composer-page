var pdftarget = "Into_the_Void.pdf";

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

  function getBrowserSize() {
    var w, h;

    if (typeof window.innerWidth != 'undefined') {
      w = window.innerWidth; //other browsers
      h = window.innerHeight;
    }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
      w = document.documentElement.clientWidth; //IE
      h = document.documentElement.clientHeight;
    }
    else {
      w = document.body.clientWidth; //IE
      h = document.body.clientHeight;
    }
    return { 'width': w, 'height': h };
  }

  document.getElementById('play-icon0').addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.currentTarget;
    if (target.classList.contains('currentlyActive')) {
      displaypdf('scores/Into_the_Void.pdf')
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
  checkScreensize();
  document.getElementsByClassName('scroller')[0].addEventListener("scroll", (event) => {
    let scroll = event.target.scrollTop;
    // console.log(scroll)
    if (scroll < getBrowserSize().height) {
      for (let navigationlink of document.querySelectorAll('.navigation')) {
        navigationlink.classList.remove("currentlyActive");
      }
      document.getElementsByClassName('navigation')[0].classList.add('currentlyActive');
    }
    else if (scroll >= getBrowserSize().height && scroll < 2 * getBrowserSize().height) {
      for (let navigationlink of document.querySelectorAll('.navigation')) {
        navigationlink.classList.remove("currentlyActive");
      }
      document.getElementsByClassName('navigation')[1].classList.add('currentlyActive');
    } else if (scroll >= getBrowserSize().height * 2 && scroll < 2.5 * getBrowserSize().height) {
      for (let navigationlink of document.querySelectorAll('.navigation')) {
        navigationlink.classList.remove("currentlyActive");
      }
      document.getElementsByClassName('navigation')[2].classList.add('currentlyActive');
    } else if (scroll >= getBrowserSize().height * 2.5 && scroll < 3 * getBrowserSize().height) {
      for (let navigationlink of document.querySelectorAll('.navigation')) {
        navigationlink.classList.remove("currentlyActive");
      }
      document.getElementsByClassName('navigation')[3].classList.add('currentlyActive');
    }
  });
});




