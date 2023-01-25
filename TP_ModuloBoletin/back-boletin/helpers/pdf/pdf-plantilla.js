
const { promedioPorAlumno, promedioAnualDirectivo, promedioInstitucionDirectivo } = require("../apis/api-analitica");


//TODO:  Funcion para sacar token. Adaptar funcion directivo anual para que se genere automaticamente


const llenarPdf = async (user) => {

  if (user.type === "Alumno-promedio") {
  
    return await promedioPorAlumno(user)
  }

  if (user.type === "Directivo-anual") {
    return await promedioAnualDirectivo(user)
  }

  if (user.type == "Directivo-promedio") {
    return await promedioInstitucionDirectivo(user);
  }
};



module.exports = {
  llenarPdf,
};
