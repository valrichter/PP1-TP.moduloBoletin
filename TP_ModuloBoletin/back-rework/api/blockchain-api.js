(()=>{

    const fetch = require('node-fetch');
    const { writeFile } = require('fs').promises;

const descargarBoletinAnual = async (anio, ruta) => {

    const url =
        `https://para-boletin-production.up.railway.app/api/boletin/getByYear?apiKey=b1a6a576d91d5796e&año=${anio}`;

    const response = await fetch(url);
    const buffer = await response.buffer();
    await writeFile(ruta + '/pdf-directivo-anual/pdfs/boletin-directivo-anual.pdf', buffer);
}


module.exports = {
    descargarBoletinAnual
};

})()