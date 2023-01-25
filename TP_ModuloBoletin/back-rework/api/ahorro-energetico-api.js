
    const fetch = require("node-fetch");
    
const getAccionesMejora = async (jurisdiccion, institucion, dispositivoId="") => {
    return await fetch(`https://ahorroenergetico-api-recomenda.herokuapp.com/api/recomendacion?institucion=${institucion}&jurisdiccion=${jurisdiccion}&id=${dispositivoId}`)
    .then(response => response.json())
    .then((result) => {
        return result;
    });
};


const getMetasCumplidas = async ()=>{
    return await fetch("https://ahorro-energetico-consumo.herokuapp.com/api/consumo/getMetasCumplidasxMes")
    .then(response => response.json())
    .then((result)=>{
        return result.ret.meta;
    })
};


module.exports = {
    getAccionesMejora,
    getMetasCumplidas
}
