const fs = require('fs')
const TelegramBot = require("node-telegram-bot-api");


const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
const bot = new TelegramBot(token, { polling: false });
const fetch = require("node-fetch");
const { generatePdfRecomendaciones } = require('./pdf-recomendaciones/generatePdfRecomendaciones');
const sendTelegramAccionesMejora = async ({ telegram_id, dispositivoId, jurisdiccion, institucion }, type) => {

  
        
        try {
            //Borrarlo -> generar uno nuevo -> mandarlo -> borrarlo
            await fs.unlink(__dirname + `/pdf-recomendaciones/pdfs/boletin-recomendaciones.pdf`, ()=>{});
            await generatePdfRecomendaciones(jurisdiccion, institucion, dispositivoId, type);
            async function loadMonoCounter() {
                const boletin = fs.readFileSync(__dirname + "/pdf-recomendaciones/pdfs/boletin-recomendaciones.pdf");
                
                return Buffer.from(boletin);
            }
    
            const file = await loadMonoCounter();
            await bot.sendDocument(telegram_id, file);
            await fs.unlink(__dirname + `/pdf-recomendaciones/pdfs/boletin-recomendaciones.pdf`, ()=>{});

        } catch (error) {
        //    generar uno nuevo -> mandarlo -> borrarlo
           await generatePdfRecomendaciones(jurisdiccion, institucion, dispositivoId, type);

        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-recomendaciones/pdfs/boletin-recomendaciones.pdf");
            
            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + `/pdf-recomendaciones/pdfs/boletin-recomendaciones.pdf`, ()=>{});
        }


};

module.exports = {
    sendTelegramAccionesMejora
};
