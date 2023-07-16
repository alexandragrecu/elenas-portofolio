document.addEventListener("DOMContentLoaded", function () {
  const pdfButton = document.getElementById("button1");
  const pdfContainer = document.getElementById("pdfContainer");
  const pdfViewer = document.getElementById("pdfViewer");

  pdfButton.addEventListener("click", function () {
    // Replace 'URL_TO_YOUR_PDF' with the actual URL of your PDF
    const pdfUrl = "./assets/documents/LG_app_overview_RO.pdf";

    // Initialize PDF.js
    const pdfjsLib = window["pdfjs-dist/build/pdf"];

    // PDF.js worker source URL
    const workerSrc = "./assets/js/pdfjs/build/pdf.worker.js";

    // Load the PDF document
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
      // Get the first page of the PDF
      pdf.getPage(1).then(function (page) {
        // Set up the canvas for rendering the PDF
        const viewport = page.getViewport({ scale: 1 });
        const canvas = pdfViewer;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the PDF page on the canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext).promise.then(function () {
          // Show the PDF container
          pdfContainer.style.display = "block";
        });
      });
    });
  });
});
