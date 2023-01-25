const { response, request } = require("express");
const { sendMailDirectivoPromedio } = require("../helpers/sendMailDirectivoPromedio");
const { sendMailDirectivoAnual } = require("../helpers/sendMailDirectivoAnual");
const { sendMailAlumnoLegajo } = require("../helpers/sendMailAlumnoLegajo");
const { sendTelegramAlumnoLegajo } = require("../helpers/sendTelegramAlumnoLegajo");
const { sendTelegramDirectivoAnual } = require("../helpers/sendTelegramDirectivoAnual");
const { sendTelegramDirectivoPromedio } = require("../helpers/sendTelegramDirectivoPromedio");
const { sendMailRecomendaciones } = require("../helpers/sendEmailRecomendaciones");
const { sendTelegramAccionesMejora } = require("../helpers/sendTelegramRecomendaciones");
const { sendMailMetas } = require("../helpers/sendMailMetas");
const { sendMailMetasCumplidas } = require("../helpers/sendMailMetasCumplidas");
const { sendTelegramMetasCumplidas } = require("../helpers/sendTelegramMetasCumplidas");
const { sendMailDatosActuales } = require("../helpers/sendMailDatosActuales");
const { sendTelegramDatosActuales } = require("../helpers/sendTelegramDatosActuales");


const enviarMail = async (req, res = response) => {

  if (req.body.type === 'Directivo-promedio') {
    result = await sendMailDirectivoPromedio(req.body);
  }

  if (req.body.type === 'Directivo-anual') {
    result = await sendMailDirectivoAnual(req.body);
  }

  if (req.body.type === 'Alumno-legajo') {
    result = await sendMailAlumnoLegajo(req.body);
  }


  return res.status(200).json({
    ok: true
  })

};

const enviarTelegram = async (req, res = response) => {

  if (req.body.type === 'Alumno-legajo') {
    result = await sendTelegramAlumnoLegajo(req.body);
  }

  if (req.body.type === 'Directivo-anual') {
    result = await sendTelegramDirectivoAnual(req.body);
  }

  if (req.body.type === 'Directivo-promedio') {
    result = await sendTelegramDirectivoPromedio(req.body);
  }


  return res.status(200).json({
    ok: true
  })
}

const enviarRecomendaciones = async (req = request, res = response) => {

  if (req.body.hasOwnProperty("email")) {
    sendMailRecomendaciones(req.body, req.body.type).then(res.json({ msg: true }))
  }
  else {
    sendTelegramAccionesMejora(req.body, req.body.type).then(res.json({ msg: true }))
  }

};
const enviarMetas = async (req = request, res = response) => {
  result = await sendMailMetas(req.body)
  return res.status(200).json({
    ok: true
  })
};


const enviarMetasCumplidas = async (req = request, res = response) => {
  if (req.body.hasOwnProperty("email")) {
    await sendMailMetasCumplidas(req.body).then(res.json({ msg: true }))
  }
  else {
    sendTelegramMetasCumplidas(req.body).then(res.json({ msg: true }))
  }
};

const enviarDatosActuales = async (req=request, res=response)=>{
  if (req.body.hasOwnProperty("email")) {
    await sendMailDatosActuales(req.body).then(res.json({ msg: true }))
  }
  else {
     sendTelegramDatosActuales(req.body).then(res.json({ msg: true }))
  }
  
}



module.exports = {
  enviarMail,
  enviarTelegram,
  enviarRecomendaciones,
  enviarMetas,
  enviarMetasCumplidas,
  enviarDatosActuales
};
