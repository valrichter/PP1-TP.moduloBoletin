const { generatePdfMetas } = require("./pdf-metas/generatePdfMetas")
const nodemailer = require("nodemailer");
const sendMailMetas = async ({ mail, meta }) => {

    const emails = mail;
    const rutaVigentes = `/pdf-metas/pdfs/boletin-metas-vigentes.pdf`;
    const rutaNoVigentes = `/pdf-metas/pdfs/boletin-metas-no-vigentes.pdf`;

    await generatePdfMetas(meta)

    await emails.forEach(async (email) => {
        await enviarMail(email, "vigentes", rutaVigentes);
        await enviarMail(email, "no-vigentes", rutaNoVigentes);
    });
}

const enviarMail = async (correo, tipo, ruta) => {
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
                    filename: `boletin-metas-${tipo}.pdf`,
                    path: __dirname + ruta,
                },
            ],
            from: `Boletín de metas ${tipo}`, // sender address
            to: correo, // list of receivers
            subject: `Boletín de metas ${tipo}`, // Subject line
            text: `Boletín de metas ${tipo}`, // plain text body
            html: `
  <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Hola !</h2>
          <p style="margin: 2px; font-size: 15px">
            Boletin metas</p>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Boletín informativo, Laboratorio de Construcción de Software I</p>
        </div>
      </td>
    </tr>
  </table>
      `,
        });
        // console.log("Enviado");
        return result;

    } catch (error) {
        // console.log(error);
        return error;
    }
};

module.exports = {
    sendMailMetas,
    enviarMail
}