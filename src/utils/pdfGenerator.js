const PDFDocument = require("pdfkit");

function generatePDF(movieList, writableStream) {
    const doc = new PDFDocument({ margin: 40, size: "A4" });

    doc.pipe(writableStream);

    // header
    doc.fontSize(20).text("Lista de Filmes", { align: "justify" });
    doc.moveDown();

    // list
    movieList.forEach((m, index) => {
        doc.fontSize(12).text(`${index + 1}. ${m.title}`);
        doc.fontSize(10).text(`   Nota: ${m.nota}`);
        doc.moveDown(0.5);
    });

    doc.end();
}

module.exports = { generatePDF };
