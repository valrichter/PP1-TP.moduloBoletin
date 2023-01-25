const table = require("../plantillas/generateTable");

const boletinPromedioNotaNumerica = async (datos, fecha) => {
  var boletinPromedioNumerico = {
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
                    text: `INFORME DIRECTIVO`,
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
                text: `Instituto: ${datos.Instituto}`,
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
                text: `Juriscción: ${datos.Jurisdiccion}`,
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
                text: `Fecha y Hora de envío: ${fecha} `,
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
                  datos.Jurisdiccion,
                  datos.Instituto,
                  datos.Nivel,
                  datos.Grado,
                  datos.Materia,
                  datos.Promedio,
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
  };
  return boletinPromedioNumerico;
};

const boletinPromedioNotaConceptual = async (datos, fecha) => {
  var boletinPromedioConceptual = {
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
                    text: `INFORME DIRECTIVO`,
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
                text: `Instituto: ${datos.Instituto}`,
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
                text: `Juriscción: ${datos.Jurisdiccion}`,
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
                text: `Fecha y Hora de envío: ${fecha} `,
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
              body: [
                [
                  "Jurisdiccion",
                  "Instituto",
                  "Nivel",
                  "Grado",
                  "Materia",
                  "Supera",
                  "Muy bien",
                  "Bien",
                  "Insuficiente",
                ],
                [
                  datos.Jurisdiccion,
                  datos.Instituto,
                  datos.Nivel,
                  datos.Grado,
                  datos.Materia,
                  datos.Notas.Supera,
                  datos.Notas.MBien,
                  datos.Notas.Bien,
                  datos.Notas.Insuficiente,
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
  };
  return boletinPromedioConceptual;
};

const boletinPromedioDirectivoAnual = async (datos, fecha) => {
  var boletinPromedioDA = {
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
                    text: `INFORME DIRECTIVO`,
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
                text: `Establecimiento: ${datos[0].Establecimiento}`,
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
                text: `Juriscción: ${datos[0].Jurisdiccion}`,
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
              // {
              //   text: `Fecha y Hora de envío: ${fecha}`,
              //   nodeName: "P",
              //   margin: [0, 5, 0, 0],
              //   style: [
              //     "html-p",
              //     "html-div",
              //     "informacion",
              //     "textoInformativo",
              //   ],
              // },
              {
                text: "Generado por: Directivo",
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
                text: `Boletín del año ${datos[0].Anio}`,
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
          await table(datos, [
            "Jurisdiccion",
            "Establecimiento",
            "Legajo",
            "Alumno",
            "Nivel",
            "Grado",
            "Materia",
            "Nota",
          ]),
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
  };
  return boletinPromedioDA;
};

module.exports = {
  boletinPromedioNotaNumerica,
  boletinPromedioNotaConceptual,
  boletinPromedioDirectivoAnual,
};
