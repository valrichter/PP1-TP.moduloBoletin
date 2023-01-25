const cors = require("cors");
const express = require("express");
const { descargarBoletinAnual } = require("./api/blockchain-api");
const app = express();
require("dotenv").config();
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

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});




