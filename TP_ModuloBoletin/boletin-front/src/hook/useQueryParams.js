import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"



export const useQueryParams = () => {

const [queries, setQueries] = useState({
    email: "",
    nombre: "",
    telegram_id: "",
    categoria: "",
    metodo_contacto: "",
    instituto: ""
});

const {search} = useLocation();

const onDecodeParams = useCallback((params) => {
    const replaceFirstCharacter = params.replace('?', '');
    const splitString = replaceFirstCharacter.split('&');
    
    const formattedQueries = {}

    splitString.forEach(query => {
        const [key, valor] = query.split("=");
        Object.assign(formattedQueries, {
            [key]: valor
        })
    })

   setQueries(formattedQueries)

}, []);


useEffect(() => {
    if(search.trim()){
        onDecodeParams(search)
    }
}, [onDecodeParams,search])


return queries;

}