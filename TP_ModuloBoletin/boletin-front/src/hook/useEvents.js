import boletinApi from "../../api/boletinApi";


export const useEvents = () => {
    //const sendTelegram = async ({ telegram_id, jurisdiccion, instituto, materia, curso, nombre, promedio }) => {
    const sendTelegram = async (data) => {

        const info = JSON.parse(data);

        if(info.type === 'boletin-consumo'){
            try{
                await boletinApi.post('/events/datos-actuales', {
                    telegram_id: info.telegram_id,
                    Institucion: info.institucion,
                    Mes: info.Mes,
                    Anio: info.Anio
                });
                
                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if(info.type === 'alumno-boletin-dispositivo'){
            
            try{
                await boletinApi.post('/events/recomendaciones', {
                    type: "Alumno",
                    telegram_id: info.telegram_id,
                    jurisdiccion: info.jurisdiccion,
                    institucion: info.institucion,
                    dispositivoId: info.dispositivo
                });

                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if(info.type === 'padre-boletin-dispositivo'){
            
            try{
                await boletinApi.post('/events/recomendaciones', {
                    type: "Padre",
                    telegram_id: info.telegram_id,
                    jurisdiccion: info.jurisdiccion,
                    institucion: info.institucion,
                    dispositivoId: info.dispositivo
                });

                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if(info.type === 'directivo-boletin-dispositivo'){
            
            try{
                await boletinApi.post('/events/recomendaciones', {
                    type: "Directivo",
                    telegram_id: info.telegram_id,
                    jurisdiccion: info.jurisdiccion,
                    institucion: info.institucion,
                    dispositivoId: info.dispositivo
                });
                
                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if (info.type === 'Alumno-legajo') {

            try {

                await boletinApi.post('/events/telegram', {
                    type: "Alumno-legajo",
                    nombre: info.nombre,
                    legajo: info.legajo,
                    telegram_id: info.telegram_id
                });


                return true;


            } catch (error) {
                console.log(error);
                return false;
            }
        }
        if (info.type === 'Directivo-promedio') {
            try {

                await boletinApi.post('/events/telegram', {
                    type: "Directivo-promedio",
                    jurisdiccion: info.jurisdiccion,
                    idInstitucion: info.idInstitucion,
                    idGrado: info.idGrado,
                    idMateria: info.idMateria,
                    nombre: info.nombre,
                    telegram_id: info.telegram_id,
                    anio: info.anio,
                    idNivel: info.idNivel

                });


                return true;


            } catch (error) {
                console.log(error);
                return false;
            }
        }
        if(info.type === 'Directivo-anual'){
            try {

                await boletinApi.post('/events/telegram', {
                    type: "Directivo-anual",
                    Anio: info.Anio,
                    telegram_id: info.telegram_id,
                });


                return true;


            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }


    const sendMail = async (data) => {

        const info = JSON.parse(data);
        if(info.type === 'boletin-consumo'){
            try{
                await boletinApi.post('/events/datos-actuales', {
                    email: info.email,
                    Institucion: info.institucion,
                    Mes: info.Mes,
                    Anio: info.Anio
                });
                
                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }

        if(info.type === 'alumno-boletin-dispositivo'){
            try{
                await boletinApi.post('/events/recomendaciones', {
                    type: "Alumno",
                    email: info.email,
                    jurisdiccion: info.jurisdiccion,
                    institucion: info.institucion,
                    dispositivoId: info.dispositivo
                });

                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if(info.type === 'padre-boletin-dispositivo'){
            
            try{
                await boletinApi.post('/events/recomendaciones', {
                    type: "Padre",
                    email: info.email,
                    jurisdiccion: info.jurisdiccion,
                    institucion: info.institucion,
                    dispositivoId: info.dispositivo
                });

                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if(info.type === 'directivo-boletin-dispositivo'){
            
            try{
                await boletinApi.post('/events/recomendaciones', {
                    type: "Directivo",
                    email: info.email,
                    jurisdiccion: info.jurisdiccion,
                    institucion: info.institucion,
                    dispositivoId: info.dispositivo
                });
                
                return true;

            }catch(error){
                console.log(error);
                return false;
            }

        }
        if (info.type === 'Alumno-legajo') {
            try {

                await boletinApi.post('/events/email', {
                    type: "Alumno-legajo",
                    nombre: info.nombre,
                    email: info.email,
                    legajo: info.legajo
                });


                return true;


            } catch (error) {
                console.log(error);
                return false;
            }
        }
        if (info.type === 'Directivo-promedio') {
            try {
                console.log(info);
                await boletinApi.post('/events/email', {
                    type: "Directivo-promedio",
                    email: info.email,
                    jurisdiccion: info.jurisdiccion,
                    idInstitucion: info.idInstitucion,
                    idGrado: info.idGrado,
                    idMateria: info.idMateria,
                    nombre: info.nombre,
                    anio: info.anio,
                    idNivel: info.idNivel
                });


                return true;


            } catch (error) {
                console.log(error);
                return false;
            }
        }
        if(info.type === 'Directivo-anual'){
            try {

                await boletinApi.post('/events/email', {
                    type: "Directivo-anual",
                    Anio: info.Anio,
                    email: info.email,
                });


                return true;


            } catch (error) {
                console.log(error);
                return false;
            }
        }

    }

    const sendMetasCumplidas = async(data) => {
        if(data.email){
            try{
                await boletinApi.post('/events/metas-cumplidas', {
                    email: data.email,
                });
    
                return true;
    
            }catch(error){
                console.log(error);
                return false;
            }
        }else{
            try{
                await boletinApi.post('/events/metas-cumplidas', {
                    telegram_id: data.telegram_id,
                });
    
                return true;
    
            }catch(error){
                console.log(error);
                return false;
            }
        }
    }

    return {

        sendMail,
        sendTelegram,
        sendMetasCumplidas
    }



}

