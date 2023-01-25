const schedule = require("node-schedule");
const { promedioAnualDirectivo } = require("./apis/api-analitica");
const { generatePdf } = require("./pdf/generatePdf");

const today = new Date();
const year = today.getFullYear();
const configuracionEnvio = async (tiempo) => {
    //Modifica variable de entorno mediante POST, por defecto (2 segundos)
    process.env.TIEMPO_ENVIO = tiempo;
};

// const generarAutomaticamente = async () => {
//     const schedule = require("node-schedule");
//  // 0 0 1 1 * Anual
//     schedule.scheduleJob("*/10 * * * * *", async () => {
//         var dat = ({
//             type: "Directivo-anual",
//             Anio: year
//         });

//         console.log("Simulando... 31/12/2022");
//         await generatePdf(dat);
//         console.log("Generó nuevo pdf anual");
//     });

// };



const enviarAblockchain = () => {
    // pdf = generarAutomaticamente() 
    //enviar(pdf)
};
//Envio a bl con post
//con un get lo sacamos de bc

module.exports = {
    // generarAutomaticamente
}