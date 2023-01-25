import axios from 'axios';
import { getEnvVariables } from '../src/helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();


const boletinApi = axios.create({
    baseURL: VITE_API_URL
});


//ACA SE PUEDEN AGREGAR LOS INTERPECTORES, PARA TODA PETICION QUE SE HAGA A AL API, SE AGREGA UN HEADER.


export default boletinApi;