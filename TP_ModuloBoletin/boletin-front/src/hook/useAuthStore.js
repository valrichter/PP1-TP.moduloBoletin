//ACA SE MANEJAN LAS PETICIONES ASINCRONICAS A SERVICIOS EXTERNOS.

import { useDispatch, useSelector } from "react-redux";
import { usuarios } from "../data-example/users";
import { onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();


    const startLogin = async({email, nombre, categoria, telegram_id, metodo_contacto, instituto}) => {

        console.log({email, nombre, categoria, telegram_id, metodo_contacto, instituto})
        //TODO: checking

        try {

            //TODO: chequear que no sean null
            dispatch(onLogin( {email, nombre, categoria, telegram_id, metodo_contacto, instituto} ));
                
           /*  const user =  usuarios.find( user => user.email === email );

            if(user){
                const { nombre, email, password, categoria, telegram_id} = user;
                dispatch(onLogin( {nombre, email, password, categoria, telegram_id}));
                

            } else{
                dispatch(onLogout('Credenciales incorrectas'))
            } */
            
        } catch (error) {
            console.log(error)

        }




    }





    return {
        //Propiedades
        status,
        user,
        errorMessage,


        //Métodos
        startLogin

    }


}