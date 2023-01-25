const nodemailer = require("nodemailer");
const { generatePdf } = require("./pdf/generatePdf");

const sendMail = async (user) => {
  try {

    let result;

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "manzanadeisaac@gmail.com", // generated ethereal user
        pass: "veesnffhycqikycg", // generated ethereal password
      },
    });

    generatePdf(user); // Se genera el pdf para tomarlo y enviarlo por mail

    if (user.type == "Directivo-anual") {
       result = await transporter.sendMail({
        attachments: [
          {
            filename: "Boletin.pdf",
            path: __dirname + `/pdf/pdfs/${user.Anio}.pdf`,
          },
        ],
        from: "Boletín de notas informativas", // sender address
        to: user.email, // list of receivers
        subject: "Boletín", // Subject line
        text: "Promedio de notas ", // plain text body
        html: `
  <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Hola !</h2>
          <p style="margin: 2px; font-size: 15px">
            Se le envía dicho mail ya que ha solicitado desde la aplicación de boletín poder obtener información sobre el promedio
            de notas de la jurisdicción: </p>
  
          
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Boletín informativo, Laboratorio de Construcción de Software I</p>
        </div>
      </td>
    </tr>
  </table>
      `,
      });
      return result;
    }
    else {
       result = await transporter.sendMail({
        attachments: [
          {
            filename: "Boletin.pdf",
            path: __dirname + "/pdf/pdfs/pdfTest.pdf",
          },
        ],
        from: "Boletín de notas informativas", // sender address
        to: user.email, // list of receivers
        subject: "Boletín", // Subject line
        text: "Promedio de notas ", // plain text body
        html: `
  <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Hola !</h2>
          <p style="margin: 2px; font-size: 15px">
            Se le envía dicho mail ya que ha solicitado desde la aplicación de boletín poder obtener información sobre el promedio
            de notas de la jurisdicción: </p>
  
          
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Boletín informativo, Laboratorio de Construcción de Software I</p>
        </div>
      </td>
    </tr>
  </table>
      `,
      });
      return result;
    }


    /* console.log(result); */
  
  } catch (error) {
    /* console.log(error); */
    return error;
  }
};

module.exports = {
  sendMail,
};
