


const dispositivosAhorro = async () => {


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return await fetch("https://ahorro-energetico-api-desc.herokuapp.com/api/descripciones", requestOptions)
        .then(response => response.json())
        .then((result) => { return result })
        .catch(error => console.log('error', error));

}


export { dispositivosAhorro };