const existeBoletin = async (anio) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return await fetch(`https://api-blockchain-production.up.railway.app/api/boletin/existe?apiKey=b1a6a576d91d5796e&year=${anio}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            return result.resultado
        })
        .catch(error => console.log('error', error));
}

const descargarBoletin = async(anio) => {
     fetch(
      `https://api-blockchain-production.up.railway.app/api/boletin/getByYear?apiKey=b1a6a576d91d5796e&year=${anio}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `Boletin-${anio}.pdf`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      });
}


export {existeBoletin, descargarBoletin};