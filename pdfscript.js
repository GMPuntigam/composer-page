var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 0.65
}
var orientation_dummy = "default"
screen.orientation.onchange = function (e) {
    render();
}

function checkorientation() {
    calculatezoom();
    var height = parseInt(getBrowserSize().height);
    var width = parseInt(getBrowserSize().width);
    if (height > width) {
        document.getElementById("left-side").style.flexDirection = "row";
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.remove("horizontal-orientation");
            element.classList.add("vertical-orientation");
            orientation_dummy = "vertical";
        }
    } else {
        document.getElementById("left-side").style.flexDirection = "column";
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.add("horizontal-orientation");
            element.classList.remove("vertical-orientation");
            orientation_dummy = "horizontal";
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
        sleep(200);
    });
}

function displaypdf(pdf_path) {
    pdfjsLib.getDocument(pdf_path).then((pdf) => {
        checkScreensize();
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
        // document.getElementById("current_page").value = myState.currentPage;
        render();
    });
}
function next() {
    document.getElementById('go_next').addEventListener('click', (e) => {
        if (myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages)
            return;
        myState.currentPage += 1;
        // document.getElementById("current_page").value = myState.currentPage;
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
    if (parseInt(getBrowserSize().height) > 1290 && parseInt(getBrowserSize().width) <= 989 && parseInt(getBrowserSize().width) >= 700) {
        // document.getElementsByClassName("scorelink currentlyActive")[0].style.border = "solid 3px rgba(168, 168, 168, 0.5)";
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.add("big-screen-vertical");
            element.classList.remove("big-screen");
            element.classList.remove("small-screen");
        }
        document.getElementById("scoreview").style.display = "flex";
    } else if (parseInt(getBrowserSize().height) >= 850 && parseInt(getBrowserSize().width) >= 980) {
        document.getElementById("scoreview").style.display = "flex";
        // document.getElementsByClassName("scorelink currentlyActive")[0].style.border = "solid 3px rgba(168, 168, 168, 0.5)";
        for (let element of document.getElementsByClassName("scorelink")) {
            element.classList.add("big-screen");
            element.classList.remove("big-screen-vertical");
            element.classList.remove("small-screen");
        }
        document.getElementById("scoreview").style.display = "flex";
    } else if (parseInt(getBrowserSize().height) <= 700 || parseInt(getBrowserSize().width) <= 700) {
        document.getElementById("scoreview").style.display = "none";
        for (var element of document.getElementsByClassName("scorelink")) {
            element.classList.add("small-screen");
            element.classList.remove("big-screen-vertical");
            element.classList.remove("big-screen");
        }
    }
}