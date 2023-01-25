import axios from 'axios';
import { getEnvVariables } from '../src/helpers/getEnvVariables';
const { VITE_API_ANALITICA_URL } = getEnvVariables();


const analiticaApi = axios.create({
    baseURL: VITE_API_ANALITICA_URL
})




//ACA SE PUEDEN AGREGAR LOS INTERPECTORES, PARA TODA PETICION QUE SE HAGA A AL API, SE AGREGA UN HEADER.




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "Username": "Boletin",
      "Password": "S1@2dS82OjZz"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let token = "";
    
    fetch("https://pp1.ath.cx/api/User", requestOptions)
      .then(response => response.text())
      .then(result => {
        token = JSON.parse(result).token;
    })
      .catch(error => console.log('error', error));







analiticaApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers, //por si hay otros headers,
        'Authorization': `Bearer ${token}`
    }

    return config;
})



export default analiticaApi;