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

  adjustPDF();
});

function adjustPDF() {
  if (parseInt(getBrowserSize().height) > 1290 && parseInt(getBrowserSize().width) <= 989 && parseInt(getBrowserSize().width) >= 700) {
    // document.getElementsByClassName("scorelink currentlyActive")[0].style.border = "solid 3px rgba(168, 168, 168, 0.5)";
    for (var element of document.getElementsByClassName("scorelink")) {
      element.classList.remove("hasBorder");
    }
    document.getElementById("scoreview").style.display = "flex";
  } else if (parseInt(getBrowserSize().height) >= 980 && parseInt(getBrowserSize().width) >= 980) {
    // document.getElementsByClassName("scorelink currentlyActive")[0].style.border = "solid 3px rgba(168, 168, 168, 0.5)";
    for (let element of document.getElementsByClassName("scorelink")) {
      element.classList.add("hasBorder");
    }
    document.getElementById("scoreview").style.display = "flex";
  } else {
    document.getElementById("scoreview").style.display = "none";
    for (var element of document.getElementsByClassName("scorelink")) {
      element.classList.remove("hasBorder");
    }
  }
}

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