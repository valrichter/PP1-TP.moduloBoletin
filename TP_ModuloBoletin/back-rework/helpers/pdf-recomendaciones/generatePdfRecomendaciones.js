const PdfPrinter = require("pdfmake");
const fs = require("fs");
const fonts = require("../pdf-acciones-mejoras/fonts");
const fetch = require("node-fetch");
const { getAccionesMejora } = require("../../api/ahorro-energetico-api");

const buildTableBody = (data, columns) => {
  var body = [];

  body.push(columns);

  data.forEach(function (row) {
    var dataRow = [];

    columns.forEach(function (column) {
      dataRow.push(row[column].toString());
    })

    body.push(dataRow);
  });

  return body;
}

const table = (data, columns) => {
  return {
    style: 'tableExample',
    table: {
      headerRows: 1,
      body: buildTableBody(data, columns)
    }
  };
}


//*FUNCION PRINCIPAL
const generatePdfRecomendaciones = async (jurisdiccion, institucion, dispositivoId, tipo) => {


  let data = await getAccionesMejora(jurisdiccion, institucion, dispositivoId);
  console.log(data.dispositivo);
  let dd = "";
  const today = new Date();
  const fechaActual = today.toLocaleString();
  dd = {
    content: [
      {
        text: "",
        style: [],
      },

      {
        style: ["header", "fuenteBanner", "banner", "anotherStyle"],
        table: {
          widths: "*",
          body: [
            [
              {
                border: [false, false, false, false],
                fillColor: "#1b9752",
                color: "white",
                text: "LA MANZANA DE ISAAC ",
              },
            ],
          ],
        },
      },

      {
        nodeName: "DIV",
        stack: [
          {
            text: "",
            style: ["html-div", "colo"],
          },
          {
            text: "",
            width: "80%",
            style: ["html-div"],
          },
          {
            nodeName: "DIV",
            id: "encabezado",
            stack: [
              {
                text: " ",
                style: ["html-div"],
              },
              {
                nodeName: "DIV",
                stack: [
                  {
                    text: " ",
                    background: "white",
                    display: "flex",
                    justifyContent: "space-around",
                    style: ["html-div", "banner"],
                  },
                  {
                    text: " ",
                    background: "white",
                    display: "flex",
                    justifyContent: "space-around",
                    style: ["html-div", "banner"],
                  },
                  {
                    text: " ",
                    background: "white",
                    display: "flex",
                    justifyContent: "space-around",
                    style: ["html-div", "banner"],
                  },
                  {
                    text: `BOLETIN DE RECOMENDACIONES PARA ${tipo}`,
                    nodeName: "P",
                    background: "white",
                    display: "flex",
                    fontSize: 25,
                    justifyContent: "space-around",
                    margin: [0, 5, 0, 10],
                    style: [
                      "anotherStyle",
                      "fuente",
                      "html-p",
                      "html-div",
                      "banner",
                      "encabezado-titulo",
                    ],
                  },
                  {
                    text: " ",
                    background: "white",
                    display: "flex",
                    justifyContent: "space-around",
                    style: ["html-div", "banner"],
                  },
                ],
              },
              {
                text: " ",
                style: ["html-div"],
              },
            ],
          },
          {
            text: " ",
            width: "80%",
            style: ["html-div"],
          },
          {
            nodeName: "DIV",
            stack: [
              {
                text: " ",
                style: ["html-div", "informacion"],
              },
              {
                text: `Jurisdicción: ${jurisdiccion} `,
                nodeName: "P",
                margin: [0, 5, 0, 10],
                style: [
                  "textoInformativo",
                  "html-p",
                  "html-div",
                  "informacion",
                ],
              },
              {
                text: `Institución: ${institucion} `,
                nodeName: "P",
                margin: [0, 5, 0, 10],
                style: [
                  "textoInformativo",
                  "html-p",
                  "html-div",
                  "informacion",
                ],
              },
              {
                text: " ",
                style: ["html-div", "informacion"],
              },
              {
                text: `Fecha y Hora de envío: ${fechaActual}`,
                nodeName: "P",
                margin: [0, 5, 0, 0],
                style: [
                  "html-p",
                  "html-div",
                  "informacion",
                  "textoInformativo",
                ],
              },
              {
                text: " ",
                style: ["html-div", "informacion"],
              },
              {
                text: " ",
                style: ["html-div", "informacion"],
              },
            ],
          },
          {
            text: "Boletin Informativo",
            style: ["header", "centrar", "tableExample"],
          },
            table(data.dispositivo, ["dispositivo", "recomendacion"]),
        //   {
        //   table: {
        //     // headers are automatically repeated if the table spans over multiple pages
        //     // you can declare how many rows should be treated as headers
        //     headerRows: 1,
        //     widths: [ '*', 'auto', 100, '*' ],
    
        //     body: [
        //       [ 'First', 'Second', 'Third', 'The last one' ],
        //       [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
        //       [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
        //     ]
        //   }
        // },

          {
            text: " ",
            width: "80%",
            style: ["html-div"],
          },
        ],
      },
    ],
    styles: {
      banner: {
        margin: [0, 100, 0, 0],
        alignment: "center",
      },
      fuenteBanner: {
        fontSize: 55,
        bold: true,
      },
      fuente: {
        fontSize: 20,
        bold: true,
      },
      textoInformativo: {
        // italics: true,
        fontSize: 16,
      },
      centrar: {
        width: "80%",
      },
      tableExample: {
        fontSize: 17,
        bold: true,
        fillColor: "#1b9752",
        color: "white",
        margin: [0, 0, 0, 0],
      },
      tableHeader: {
        // bold: true,
        fontSize: 13,
        color: "black",
      },
      bodyTable: {
        color: "black",
        fillColor: "white",
      },
      anotherStyle: {
        // italics: true,
        alignment: "center",
      },
    },
  }

  const printer = new PdfPrinter(fonts);
  let pdfDoc = printer.createPdfKitDocument(dd, { fontLayoutCache: false });
  pdfDoc.pipe(fs.createWriteStream(__dirname + "/pdfs/boletin-recomendaciones.pdf"));
  pdfDoc.end();
  data = "";
 }

module.exports = {
  generatePdfRecomendaciones
}