var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 0.65
}

function calculatezoom() {
    var height = parseInt(getBrowserSize().height);
    var width = parseInt(getBrowserSize().width);
    var horizontalzoom = width / 1240;
    var verticalzoom = 2 * height * 0.58 / 1754;
    var zoom = Math.min(horizontalzoom, verticalzoom, 1);
    myState.zoom = zoom;
}

function render() {
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
        calculatezoom();
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