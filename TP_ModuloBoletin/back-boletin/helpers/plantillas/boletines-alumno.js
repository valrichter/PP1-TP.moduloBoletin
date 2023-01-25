const table = require("../plantillas/generateTable");

const boletinAlumno = async (datos, user, fecha) => {
  var boletinAnualAlumno = {
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
                    text: `INFORME ALUMNO: ${user.Nombre.toUpperCase() || ""}`,
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
                text: `Legajo de alumno: ${user.Legajo || ""}`,
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
                text: `Jurisdicción: ${user.Jurisdiccion || null}`,
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
                text: `Generado por: ${user.Nombre}`,
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
            text: "Boletin Informativo",
            style: ["header", "centrar", "tableExample"],
          },
          await table(datos, ["Anio", "Nombre", "Nivel", "Grado", "Nota"]),

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
  return boletinAnualAlumno;
};

module.exports = {
  boletinAlumno,
};
