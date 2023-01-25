const fs = require('fs')
const TelegramBot = require("node-telegram-bot-api");
const { generatePdfdatosActuales } = require('./pdf-datos-actuales/generatePdfDatosActuales');


const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
const bot = new TelegramBot(token, { polling: false });

const sendTelegramDatosActuales = async ({ telegram_id, Institucion, Mes, Anio }) => {

   

        try {
            //Borrarlo -> generar uno nuevo -> mandarlo -> borrarlo
            await fs.unlink(__dirname + `/pdf-datos-actuales/pdfs/boletin-datos-actuales.pdf`, ()=>{});
            await generatePdfdatosActuales(Institucion, Mes, Anio )
            async function loadMonoCounter() {
                const boletin = fs.readFileSync(__dirname + "/pdf-datos-actuales/pdfs/boletin-datos-actuales.pdf");
                
                return Buffer.from(boletin);
            }
    
            const file = await loadMonoCounter();
            await bot.sendDocument(telegram_id, file);
            await fs.unlink(__dirname + `/pdf-datos-actuales/pdfs/boletin-datos-actuales.pdf`, ()=>{});

        } catch (error) {
            //generar uno nuevo -> mandarlo -> borrarlo
            await generatePdfdatosActuales(Institucion, Mes, Anio )

        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-datos-actuales/pdfs/boletin-datos-actuales.pdf");
            
            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + `/pdf-datos-actuales/pdfs/boletin-datos-actuales.pdf`, ()=>{});
        }


};

module.exports = {
    sendTelegramDatosActuales
};
