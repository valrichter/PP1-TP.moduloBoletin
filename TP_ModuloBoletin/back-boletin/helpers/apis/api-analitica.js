require("dotenv").config();
var axios = require("axios");
var fs = require('fs');
const { dirname } = require("path");


const { boletinAlumno } = require("../plantillas/boletines-alumno");
const { boletinPromedioDirectivoAnual, boletinPromedioNotaConceptual, boletinPromedioNotaNumerica } = require("../plantillas/boletines-directivo");


const api = "https://pp1.ath.cx/api";

var today = new Date();
var now = today.toLocaleString();


const validarToken = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "Username": "Boletin",
      "Password": "S1@2dS82OjZz"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let token = "";
    
    fetch("https://pp1.ath.cx/api/User", requestOptions)
      .then(response => response.text())
      .then(result => {
        token = JSON.parse(result).token;
        process.env.ANALITICA_TOKEN = token;
    })
      .catch(error => console.log('error', error));
};

//Lo saca directivo (El promedio de una materia)
const promedioInstitucionDirectivo = async (obj) => {

    validarToken();
    var datos;
    console.log("Es directivo!");

    var data = JSON.stringify({
        type: obj.type,
        idInstitucion: obj.idInstitucion,
        idMateria: obj.idMateria,
        idNivel: obj.idNivel,
        idGrado: obj.idGrado,
        anio: obj.anio,
    });

 






    var config = {
        method: "post",
        url: `${api}/PromedioInstitucion`,
        headers: {
            Authorization: `Bearer ${process.env.ANALITICA_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: data,
    };

    await axios(config)
        .then(async function (response) {
            datos = await response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    if (datos.Conceptual) {
        console.log("Conceptual");
        return await boletinPromedioNotaConceptual(datos, now);
    }
    if (!datos.Conceptual) {
        console.log("No Conceptual");
        return await boletinPromedioNotaNumerica(datos, now);
    }
};

//Lo saca directivo (le da las materias de todos los alumnos por año)
const promedioAnualDirectivo = async (obj) => {
    validarToken();
    var datos;

    var data = JSON.stringify({
        Anio: obj.Anio,
    });
    var config = {
        method: "post",
        url: `${api}/PromedioAnualAlumno`,
        headers: {
            Authorization: `Bearer ${process.env.ANALITICA_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    validarToken();
    await axios(config)
        .then(async function (response) {
            datos = await response.data;
            // console.log(datos);
        })
        .catch(function (error) {
            console.log(error);
        });

    return await boletinPromedioDirectivoAnual(datos, now);
    //  return await devolverPDFAnualDirectivo(2019);
};

// const devolverPDFAnualDirectivo = async (año) => {
//         const boletin = await fs.readFile(`../helpers/pdf/pdfs/${año}.pdf`);
//         console.log(boletin);
//     return boletin;
// };


//Lo saca el alumno (Le da sus materias )
const promedioPorAlumno = async (obj) => {
    validarToken();
    let materias = [];
    let usuario;
    var data = JSON.stringify({
        Legajo: obj.legajo,
    });
    // console.log(process.env.TOKEN);
    var config = {
        method: "post",
        url: `${api}/PromedioPorAlumno`,
        headers: {
            Authorization: `Bearer ${process.env.ANALITICA_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    var datos = [];

    await axios(config)
        .then(async function (response) {
            usuario = response.data;
            materias = await usuario.Materias;
            await materias.forEach((materia) => {
                datos.push(materia);
            });
        })
        .catch(function (error) {
        });
    const result = await boletinAlumno(datos, usuario, now);
    materias = [];
    datos = [];
    return result;
};

module.exports = {
    validarToken, promedioInstitucionDirectivo, promedioAnualDirectivo, promedioPorAlumno
}