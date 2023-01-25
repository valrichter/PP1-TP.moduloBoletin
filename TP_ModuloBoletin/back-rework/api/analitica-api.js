require("dotenv").config();
const fetch = require("node-fetch");

const generarToken = async () => {

    var myHeaders = new fetch.Headers();
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
    await fetch("https://pp1.ath.cx/api/User", requestOptions)
        .then(response => response.text())
        .then(result => {
            token = JSON.parse(result).token;
            process.env.ANALITICA_TOKEN = token;
        })
        .catch(error => console.log('error', error));

}



const promedioDirectivo = async ({idInstitucion, idMateria, idNivel, idGrado, anio}) => {
    await generarToken()
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.ANALITICA_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "idInstitucion": idInstitucion,
        "idMateria": idMateria,
        "idNivel": idNivel,
        "idGrado": idGrado,
        "anio": anio
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

     return await fetch("https://pp1.ath.cx/api/PromedioInstitucion", requestOptions)
        .then(response => response.json())
        .then((result) => {
            return result;
        })
        .catch(error => console.log('error', error));

}

const anualDirectivo = async (Anio) => {
    await generarToken()
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.ANALITICA_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Anio": Anio
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

     return await fetch("https://pp1.ath.cx/api/PromedioAnualAlumno", requestOptions)
        .then(response => response.json())
        .then((result) => {
            return result;
        })
        .catch(error => console.log('error', error));

}

const legajoAlumno = async (legajo) => {
    await generarToken()
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.ANALITICA_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "Legajo": legajo
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

     return await fetch("https://pp1.ath.cx/api/PromedioPorAlumno", requestOptions)
        .then(response => response.json())
        .then((result) => {
            return result;
        })
        .catch(error => console.log('error', error));

}


const datosActuales = async (institucion, mes, anio)=>{
    await generarToken()
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.ANALITICA_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "Institucion":institucion,
        "Mes": mes,
        "Anio": anio
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return await fetch("https://pp1.ath.cx/api/PromedioMensualConsumo", requestOptions)
    .then(response => response.json())
    .then((result) => {
        return result.consumos;
    })
    .catch(error => console.log('error', error));
};


  



module.exports = { promedioDirectivo, anualDirectivo, legajoAlumno, datosActuales }