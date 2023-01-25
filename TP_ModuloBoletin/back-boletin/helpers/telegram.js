const fs = require("fs").promises;
const TelegramBot = require("node-telegram-bot-api");
const { generatePdf } = require("./pdf/generatePdf");

const enviarTelegram = async (user) => {
  const token = "5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4";
  const bot = new TelegramBot(token, { polling: true });

  try {
    if (user.type == "Directivo-anual") {
      async function loadMonoCounter() {
        const boletin = await fs.readFile(__dirname + `/pdf/pdfs/${user.Anio}.pdf`);
        return Buffer.from(boletin);
      }
      const file = await loadMonoCounter();
      bot.sendDocument(user.telegram_id, file);
    }
    else {

      async function loadMonoCounter() {
        await generatePdf(user);
        const boletin = await fs.readFile(__dirname + "/pdf/pdfs/pdfTest.pdf");
        return Buffer.from(boletin);
      }

      const file = await loadMonoCounter();
      bot.sendDocument(user.telegram_id, file);

    }


  } catch (TelegramResponseException) {
    return "Error";
  }

};

module.exports = {
  enviarTelegram,
};
