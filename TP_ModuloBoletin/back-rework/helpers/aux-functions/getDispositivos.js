


const { getAccionesMejora } = require("../../api/ahorro-energetico-api");


const getDispositivos = async (jurisdiccion, institucion) => {
    let dispositivos = [];

    const data = await getAccionesMejora(jurisdiccion, institucion, "");
    data.dispositivo.forEach(objeto => {
        dispositivos.push(objeto.dispositivo);
    });
    console.log(dispositivos);
    return dispositivos;
};




module.exports = {
    getDispositivos
}

//Ejemplo de llamada 
//                       getDispositivos("Ciudad Autónoma de Buenos Aires", "La manzana de isaac");
//Resultado
/*
[
  'Ventilador techo',
  'Aire Acondicionado Hibrido',
  'Cañón – Proyector',
  'Televisor',
  'Ventilador pared',
  'Micro-Ondas'
]
< LOS IDS EMPIEZAN EN 1, NO EN 0 -> 'Ventilador techo' ES EL ID = 1, 'Aire Acondicionado Hibrido' ES EL ID = 2 ... >
*/

