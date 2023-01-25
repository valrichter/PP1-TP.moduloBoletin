require("dotenv").config();
const cors = require("cors");
const express = require("express");
var cron = require('node-cron');
const { generarAutomaticamente } = require("./helpers/envio-boletin-automatizacion");

//Crear el servidor de express
const app = express();

//Base de datos

//CORS
app.use(cors());

//Directorio público
app.use(express.static("public"));

//Letura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/events", require("./routes/events.route"));

//Esto se realiza para evitar el error de recargar cuando esta desplegado en heroku
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// generarAutomaticamente();
// generarAutomaticamente();

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
