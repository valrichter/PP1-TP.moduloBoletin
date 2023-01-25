const nodemailer = require("nodemailer");
const { descargarBoletinAnual } = require("../api/blockchain-api");
const fs = require('fs').promises;
const { generatePdfDirectivoAnual} = require("./pdf-directivo-anual/generatePdfDirectivoAnual");

const sendMailDirectivoAnual = async ({email, Anio}) => {
    try {

        await descargarBoletinAnual(Anio, __dirname);
        //await generatePdfDirectivoAnual(Anio);

        let result;

        await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "manzanadeisaac@gmail.com", // generated ethereal user
                pass: "veesnffhycqikycg", // generated ethereal password
            },
        });


        result = await transporter.sendMail({
          attachments: [
            {
              filename: "Boletin.pdf",
              path: __dirname + `/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf`,
            },
          ],
            from: "Boletín de notas informativas", // sender address
            to: email, // list of receivers
            subject: "Boletín Directivo Anual", // Subject line
            text: "Directivo anual", // plain text body
            html: `
  <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Hola !</h2>
          <p style="margin: 2px; font-size: 15px">
            Boletin directivo anual</p>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Boletín informativo, Laboratorio de Construcción de Software I</p>
        </div>
      </td>
    </tr>
  </table>
      `,
        });

        //Elimino el pdf
        await fs.unlink(__dirname + '/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf');
        
        return result;



        /* console.log(result); */

    } catch (error) {
        /* console.log(error); */
        return error;
    }
};

module.exports = {
    sendMailDirectivoAnual,
};
