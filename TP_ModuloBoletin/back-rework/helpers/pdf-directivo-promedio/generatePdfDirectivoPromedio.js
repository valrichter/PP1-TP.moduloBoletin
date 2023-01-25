const PdfPrinter = require("pdfmake");
const fs = require("fs");

const fonts = require("./fonts");
const { promedioDirectivo } = require("../../api/analitica-api");

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
const generatePdfDirectivoPromedio = async (params) => {
    let dd = "";
    let data = await promedioDirectivo(params);

    const today = new Date();
    const fechaActual = today.toLocaleString();

    if (data.Conceptual === false) {
        //* CHEQUEAR QUE ANALITICA TENGA UN PUNTO EN VEZ DE UNA COMA
        if(data.Promedio.length >=3){
            let promedio = data.Promedio.replace(',', '.');
            promedio = parseFloat(promedio)
            promedio = promedio.toFixed(2)
            data.Promedio = promedio
        }
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
                              text: `INFORME DIRECTIVO PROMEDIO`,
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
                          text: `Instituto: ${data.Instituto}`,
                          nodeName: "P",
                          margin: [0, 5, 0, 0],
                          style: [
                            "textoInformativo",
                            "html-p",
                            "html-div",
                            "informacion",
                          ],
                        },
                        {
                          text: `Jurisdicción: ${data.Jurisdiccion}`,
                          nodeName: "P",
                          margin: [0, 5, 0, 0],
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
                          text: `Fecha y Hora de envío: ${fechaActual} `,
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
                          text: "Generado por: Directivo ",
                          nodeName: "P",
                          margin: [0, 5, 0, 60],
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
                          text: " ",
                          style: ["html-div", "informacion"],
                        },
                      ],
                    },
                    {
                      table: {
                        headerRows: 1,
                        body: [
                          [
                            "Jurisdiccion",
                            "Instituto",
                            "Nivel",
                            "Grado",
                            "Materia",
                            "Promedio",
                          ],
                          [
                            data.Jurisdiccion,
                            data.Instituto,
                            data.Nivel,
                            data.Grado,
                            data.Materia,
                            data.Promedio,
                          ],
                        ],
                      },
                    },
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
    }
    if (data.Conceptual === true) {
        data.Supera = data.Notas.Supera.toFixed(2);
        data.MBien = data.Notas.MBien.toFixed(2);
        data.Bien = data.Notas.Bien.toFixed(2);
        data.Insuficiente = data.Notas.Insuficiente.toFixed(2);
        data = [data];
        console.log(data)
        /* dd = {
            content: [
                { text: 'Boletin promedio directivo', style: 'header' },
                table(data, ['Jurisdiccion', 'Instituto', 'Materia', 'Anio', 'Nivel', 'Grado', 'Supera', 'MBien', 'Bien', 'Insuficiente'])
            ]
        },
            styles:{
                header: {
                    fontSize: 20,
                    bold: true
                },
                tableExample: {
                    fontSize: 8,
                    bold: true
                }
            } */
    }
    if (data.Mensaje === "No se encontro notas para los parametros indicados") {
        dd = {
            content: [
                { text: 'Boletin promedio directivo - NO EXISTEN REGISTROS PARA LOS DATOS SOLICIDATOS', style: 'header' },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true
                },
                tableExample: {
                    fontSize: 8,
                    bold: true
                }
            }
        }
    }


    const printer = new PdfPrinter(fonts);
    let pdfDoc = printer.createPdfKitDocument(dd);
    pdfDoc.pipe(fs.createWriteStream(__dirname + "/pdfs/boletin-directivo-promedio.pdf"));
    pdfDoc.end();

}

module.exports = {
    generatePdfDirectivoPromedio
}