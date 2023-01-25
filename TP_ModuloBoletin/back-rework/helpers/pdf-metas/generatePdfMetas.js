const PdfPrinter = require("pdfmake");
const fs = require("fs");
const fonts = require("../pdf-acciones-mejoras/fonts");

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



const generatePdfMetas = async (metas) => {
    //separa las metas
    let metasVigentes = [];
    let metasNoVigentes = [];

    await metas.forEach(meta => {
        if (!meta.vigente)
            metasNoVigentes.push(meta);
        else
            metasVigentes.push(meta);
    });

    const rutaVigentes = "/pdfs/boletin-metas-vigentes.pdf";
    const rutaNoVigentes = "/pdfs/boletin-metas-no-vigentes.pdf";


    //Genera pdf para metas vigentes
    await generatePdfs(metasVigentes, rutaVigentes, "VIGENTES");
    //genera pdf para metas noVigentes
    await generatePdfs(metasNoVigentes, rutaNoVigentes, "NO VIGENTES");



};

const generatePdfs = (meta, ruta, tipo) => {
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
                                        text: `BOLETIN DE METAS ${tipo}`,
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
                    table(meta, ["jurisdiccion", "institucion", "tipoDispositivo", "meta", "consumoActual", "fechaDesde", "fechaHasta"]),
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
                fontSize: 10,
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
    pdfDoc.pipe(fs.createWriteStream(__dirname + ruta));
    pdfDoc.end();
    data = "";

};

module.exports = {
    generatePdfMetas,
    generatePdfs
}