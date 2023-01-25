const fs = require('fs')
const TelegramBot = require("node-telegram-bot-api");
const { descargarBoletinAnual } = require('../api/blockchain-api');
const { generatePdfDirectivoAnual } = require('./pdf-directivo-anual/generatePdfDirectivoAnual');


const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
const bot = new TelegramBot(token, { polling: false });

const sendTelegramDirectivoAnual = async ({ telegram_id, Anio, }) => {

   

        try {
            //Borrarlo -> generar uno nuevo -> mandarlo -> borrarlo
            await fs.unlink(__dirname + `/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf`, ()=>{});
            //await generatePdfDirectivoAnual(Anio);
            await descargarBoletinAnual(Anio, __dirname);
            async function loadMonoCounter() {
                const boletin = fs.readFileSync(__dirname + "/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf");
                
                return Buffer.from(boletin);
            }
    
            const file = await loadMonoCounter();
            await bot.sendDocument(telegram_id, file);
            await fs.unlink(__dirname + `/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf`, ()=>{});

        } catch (error) {
            //generar uno nuevo -> mandarlo -> borrarlo
            //await generatePdfDirectivoAnual(Anio);
            await descargarBoletinAnual(Anio, __dirname);
        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf");
            
            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + `/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf`, ()=>{});
        }


};

module.exports = {
    sendTelegramDirectivoAnual
};
