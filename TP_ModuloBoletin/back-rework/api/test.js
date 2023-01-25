
(async ()=>{
    
    const { datosActuales } = require("./analitica-api")
    const datos =await datosActuales("9","11","2022")
    console.log(datos);
})()