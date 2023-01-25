/* Events Routes
    /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { enviarMail } = require("../controllers/events.controller");
const { enviarTeleg } = require("../controllers/events.controller");
const { configuracionEnvio } = require("../helpers/envio-boletin-automatizacion");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Todas tienen que pasar por la validación del JWT
//Con esto nos evitamos de poner validarJWT en cada ruta
/* router.use(validarJWT); */

//Crear un nuevo evento
let boletines = "['Alumno-promedio', 'Directivo-anual','Directivo-promedio']";

router.post(
  "/email",
  [check("email", "El email es obligatorio").not().isEmpty(),
  check("type", `El tipo de boletin es obligatorio ${boletines}`).not().isEmpty(),
    validarCampos
  ],
  enviarMail
);

// router.post("/tiempo", [
//   check("tiempo", "El tiempo es obligatorio"),
//   validarCampos],
//   configuracionEnvio);
  

router.post(
  "/telegram",
  [
    check("telegram_id", "El telegram_id es obligatorio").not().isEmpty(),
    check("type", `El tipo de boletin es obligatorio ${boletines}`).not().isEmpty(),
    validarCampos,
  ],
  enviarTeleg
);

// router.post('/legajo', enviarTeleg);

module.exports = router;
