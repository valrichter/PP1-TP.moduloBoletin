const PdfPrinter = require("pdfmake");
const fs = require("fs");
const fonts = require("./fonts");
const styles = require("./styles");
const { llenarPdf } = require("./pdf-plantilla");

const generatePdf = async (user) => {
  const docDefinition = await llenarPdf(user);
  const printer = new PdfPrinter(fonts);

  let pdfDoc = await printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(__dirname + "/pdfs/pdfTest.pdf"));
  pdfDoc.end();
};

module.exports = {
  generatePdf,
};


//
// const PdfPrinter = require("pdfmake");
// const fs = require("fs");
// const fonts = require("./fonts");
// const styles = require("./styles");
// const { llenarPdf } = require("./pdf-plantilla");

// const generatePdf = async (user) => {
//   const today = new Date();
//   let anio = today.getFullYear();
//   let hora = today.getTime();
//   const docDefinition = await llenarPdf(user);
//   const printer = new PdfPrinter(fonts);

//   let pdfDoc = await printer.createPdfKitDocument(docDefinition);
//   let fecha = await today.toLocaleString().replace(/\s/g, '-').replace("/","_").replace("/","_").replace(":","_").replace(":","_");

//   pdfDoc.pipe(fs.createWriteStream(__dirname + `/pdfs/${fecha}.pdf` ));
//   pdfDoc.end();
// };

// module.exports = {
//   generatePdf,
// };
