const fs = require('fs')
const TelegramBot = require("node-telegram-bot-api");
const { generatePdfDirectivoPromedio } = require("./pdf-directivo-promedio/generatePdfDirectivoPromedio");


const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
const bot = new TelegramBot(token, { polling: false });

const sendTelegramDirectivoPromedio = async ({telegram_id,idInstitucion, idMateria, idNivel, idGrado, anio}) => {

   

        try {
            //Borrarlo -> generar uno nuevo -> mandarlo -> borrarlo
            await fs.unlink(__dirname + `/pdf-directivo-promedio/pdfs/boletin-directivo-promedio.pdf`, ()=>{});
            await generatePdfDirectivoPromedio({idInstitucion, idMateria, idNivel, idGrado, anio});
            async function loadMonoCounter() {
                const boletin = fs.readFileSync(__dirname + "/pdf-directivo-promedio/pdfs/boletin-directivo-promedio.pdf");
                
                return Buffer.from(boletin);
            }
    
            const file = await loadMonoCounter();
            await bot.sendDocument(telegram_id, file);
            await fs.unlink(__dirname + `/pdf-directivo-promedio/pdfs/boletin-directivo-promedio.pdf`, ()=>{});

        } catch (error) {
            //generar uno nuevo -> mandarlo -> borrarlo
            await generatePdfDirectivoPromedio({idInstitucion, idMateria, idNivel, idGrado, anio});

        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-directivo-promedio/pdfs/boletin-directivo-promedio.pdf");
            
            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + `/pdf-directivo-promedio/pdfs/boletin-directivo-promedio.pdf`, ()=>{});
        }


};

module.exports = {
    sendTelegramDirectivoPromedio
};
