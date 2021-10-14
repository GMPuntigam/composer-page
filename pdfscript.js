var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 0.65
}
// var orientation_dummy = "default"
// screen.orientation.onchange = function (e) {
//     render();
// }


var timeout = false, // holder for timeout id
    delay = 250, // delay after event is "complete" to run callback
    calls = 0;

// window.resize event listener
window.addEventListener('resize', function () {
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(render, delay);
});


function checkorientation() {
    calculatezoom();
    var height = parseInt(getBrowserSize().height);
    var width = parseInt(getBrowserSize().width);
    if (height > width) {
        for (var element of document.getElementsByClassName("picture-left_text-right")) {
            element.style.flexDirection = "column"
        }

    } else {
        for (var element of document.getElementsByClassName("picture-left_text-right")) {
            element.style.flexDirection = "row"
        }
    }
}

function calculatezoom() {
    var height = parseInt(getBrowserSize().height);
    var width = parseInt(getBrowserSize().width);
    var horizontalzoom = width / 1240;
    var verticalzoom = 2 * height * 0.58 / 1754;
    var zoom = Math.min(horizontalzoom, verticalzoom, 1);
    myState.zoom = zoom;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function render() {
    checkScreensize();
    checkorientation();
    myState.pdf.getPage(myState.currentPage).then((page) => {

        var canvas = document.getElementById("pdf_renderer");
        var ctx = canvas.getContext('2d');

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

function displaypdf(pdf_path) {
    pdfjsLib.getDocument(pdf_path).then((pdf) => {
        myState.pdf = pdf;
        myState.currentPage = 1;
        render();
    });
}

function previous() {
    document.getElementById('go_previous').addEventListener('click', (e) => {
        if (myState.pdf == null || myState.currentPage == 1)
            return;
        myState.currentPage -= 1;
        render();
    });
}
function next() {
    document.getElementById('go_next').addEventListener('click', (e) => {
        if (myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages)
            return;
        myState.currentPage += 1;
        render();
    });
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

function checkScreensize() {
    if (parseInt(getBrowserSize().height) > 700 && parseInt(getBrowserSize().width) <= 1000 && parseInt(getBrowserSize().width) > 700) {
        document.getElementById("scoreview").style.display = "flex";
        document.getElementById("left-side").style.flexDirection = "row";
        for (var element of document.getElementsByClassName("picture-left_text-right")) {
            element.style.flexDirection = "row"
        }
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.remove("small-screen");
            element.classList.add("vertical-layout");
            element.classList.remove("horizontal-layout");
        }
    } else if (parseInt(getBrowserSize().height) > 700 && parseInt(getBrowserSize().width) > 1000) {
        document.getElementById("scoreview").style.display = "flex";
        document.getElementById("left-side").style.flexDirection = "column";
        for (var element of document.getElementsByClassName("picture-left_text-right")) {
            element.style.flexDirection = "row"
        }
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.remove("small-screen");
            element.classList.add("horizontal-layout");
            element.classList.remove("vertical-layout");
        }
    } else if (parseInt(getBrowserSize().height) <= 400 || parseInt(getBrowserSize().width) <= 700) {
        document.getElementById("scoreview").style.display = "none";
        document.getElementById("left-side").style.flexDirection = "column";
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.add("small-screen");
            element.classList.remove("vertical-layout");
            element.classList.remove("horizontal-layout");
        }
    }
}