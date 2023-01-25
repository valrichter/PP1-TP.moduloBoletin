(async () => {
  const fetch = require("node-fetch");

  const traerDatos = async () => {
    var myHeaders = new fetch.Headers();

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkJvbGV0aW4iLCJuYmYiOjE2NjYyMDIyODEsImV4cCI6MTY2NjI4ODY4MSwiaWF0IjoxNjY2MjAyMjgxLCJpc3MiOiJodHRwczovL3BwMS5hdGguY3giLCJhdWQiOiJodHRwczovL3BwMS5hdGguY3gifQ.jqnTlFQWC88MeMOIuFEKthnQ2cefok5U8sUUIg-D8Dc"
    );

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ Legajo: "40691871" });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("https://pp1.ath.cx/api/PromedioPorAlumno", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  traerDatos();
})();
