const { Router } = require("express");
const router = Router();
const { enviarMail, enviarTelegram, enviarMejoras, enviarRecomendaciones, enviarMetas, enviarMetasCumplidas, enviarDatosActuales } = require("../controllers/events.controller");


router.post(
  "/email",
  enviarMail
);
router.post(
  "/telegram",
  enviarTelegram
);

// router.post(
//   "/mejoras",
//   enviarMejoras
// );

router.post(
  "/recomendaciones",
  enviarRecomendaciones
)

//Esto lo hace el proceso automatico de ahorro energetico
router.post(
  "/metas",
  enviarMetas
)

router.post(
  "/metas-cumplidas",
  enviarMetasCumplidas
)

router.post(
  "/datos-actuales",
  enviarDatosActuales
)



// router.post('/legajo', enviarTeleg);

module.exports = router;
