
export const getEnvVariables = () => {

    //import.meta.env;

    return{
        //PARA PRODUCCION PONER CADA UNA.
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_API_ANALITICA_URL: import.meta.env.VITE_API_ANALITICA_URL
        /* ...import.meta.env */
    }

}