const { generatePdfMetasCumplidas } = require("./pdf-metas-cumplidas/generatePdfMetasCumplidas");
const nodemailer = require("nodemailer");
const { saveBoletinMetasCumplidas } = require("./conexion");
const sendMailMetasCumplidas = async ({ email }) => {
    await generatePdfMetasCumplidas();

   
  

    await enviarMail(email);

};
const enviarMail = async (correo) => {
    try {
        let result;
        nodemailer.createTestAccount();
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
                    filename: `boletin-metas-cumplidas.pdf`,
                    path: __dirname + `/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf`,
                },
            ],
            from: `Boletín de metas cumplidas por mes`, // sender address
            to: correo, // list of receivers
            subject: `Boletín de metas cumplidas por mes`, // Subject line
            text: `Boletín de metas cumplidas por mes`, // plain text body
            html: `
  <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Hola!</h2>
          <p style="margin: 2px; font-size: 15px">
            Boletin metas cumplidas por mes</p>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Boletín informativo, Laboratorio de Construcción de Software I</p>
        </div>
      </td>
    </tr>
  </table>
      `,
        });
        await saveBoletinMetasCumplidas()
        return result;

    } catch (error) {
        return error;
    }
};


module.exports = {
    sendMailMetasCumplidas
}