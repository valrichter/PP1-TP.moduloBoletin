const { generatePdfMetasCumplidas } = require("./pdf-metas-cumplidas/generatePdfMetasCumplidas");
const fs = require('fs')
const TelegramBot = require("node-telegram-bot-api");
const { saveBoletinMetasCumplidas } = require("./conexion");
// const { saveBoletinMetasCumplidas } = require("./conexion");

const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
const bot = new TelegramBot(token, { polling: false });
const sendTelegramMetasCumplidas = async ({ telegram_id }) => {


    try {
        //Borrarlo -> generar uno nuevo -> mandarlo -> borrarlo
        await fs.unlink(__dirname + `/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf`, () => { });
        await generatePdfMetasCumplidas();
        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf");

            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + "/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf", () => { });

    } catch (error) {
        //    generar uno nuevo -> mandarlo -> borrarlo
        await generatePdfMetasCumplidas();

        async function loadMonoCounter() {
            const boletin = fs.readFileSync(__dirname + "/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf");
            return Buffer.from(boletin);
        }

        const file = await loadMonoCounter();
        await saveBoletinMetasCumplidas();
        await bot.sendDocument(telegram_id, file);
        await fs.unlink(__dirname + "/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf", () => { });
    }



};

module.exports = {
    sendTelegramMetasCumplidas
}