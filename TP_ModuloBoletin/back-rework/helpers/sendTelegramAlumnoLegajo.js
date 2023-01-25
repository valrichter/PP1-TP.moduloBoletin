const fs = require('fs')
const TelegramBot = require("node-telegram-bot-api");
const { generatePdfAlumnoLegajo } = require("./pdf-alumno-legajo/generatePdfAlumnoLegajo");


const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
const bot = new TelegramBot(token, { polling: false });

const sendTelegramAlumnoLegajo = async ({ telegram_id, legajo, nombre }) => {

   

        try {
            //Borrarlo -> generar uno nuevo -> mandarlo -> borrarlo
            await fs.unlink(__dirname + `/pdf-alumno-legajo/pdfs/boletin-alumno-legajo.pdf`, ()=>{});
            await generatePdfAlumnoLegajo(legajo, nombre);
            async function loadMonoCounter() {
                const boletin = fs.readFileSync(__dirname + "/pdf-alumno-legajo/pdfs/boletin-alumno-legajo.pdf");
                
                return Buffer.from(boletin);
            }
    
            const file = await loadMonoCounter();
            await bot.sendDocument(telegram_id, file);
            await fs.unlink(__dirname + `/pdf-alumno-legajo/pdfs/boletin-alumno-legajo.pdf`, ()=>{});

        } catch (error) {
            //generar uno nuevo -> mandarlo -> borrarlo
            await generatePdfAlumnoLegajo(legajo, nombre);

        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-alumno-legajo/pdfs/boletin-alumno-legajo.pdf");
            
            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + `/pdf-alumno-legajo/pdfs/boletin-alumno-legajo.pdf`, ()=>{});
        }


};

module.exports = {
    sendTelegramAlumnoLegajo
};
