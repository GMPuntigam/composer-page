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
  document.getElementById('Into_the_void').addEventListener('click', function (e) {
    displaypdf('scores/Into_the_void.pdf')
  });

  document.getElementById('In_Jubilo').addEventListener('click', function (e) {
    displaypdf('scores/In_Jubilo.pdf')
  });

  document.getElementById('Weihnachtstanz').addEventListener('click', function (e) {
    displaypdf('scores/Weihnachtstanz.pdf')
  });
});


