import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import {descargarBoletin, existeBoletin} from "../../../api/blockchain";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import "../../index.css";
export const DirectivoBoletinAnual = () => {
  const { user, status } = useAuthStore();
  const { sendMail, sendTelegram } = useEvents();

  const [selectAnio, setSelectAnio] = useState({
    value: "",
    selectedNivel: false,
  });

  const handleSelectChangeAnio = ({ value, selectedAnio }) => {
    setSelectAnio({ value, selectedAnio });
  };

  const handleSendTelegram = async (e) => {
    e.preventDefault();

    const data = {
      type: "Directivo-anual",
      Anio: selectAnio.value,
      telegram_id: user.telegram_id,
    };

    const existe = await existeBoletin(selectAnio.value);
    
    if(!existe){
      return Swal.fire({
        icon: "error",
        title: `No se ha generado el pdf del año ${selectAnio.value}`,
        showConfirmButton: false,
      });
    }
    else{
      await sendTelegram(JSON.stringify(data));
      return Swal.fire({
        icon: "success",
        title: "Telegram enviado correctamente!!!!",
        showConfirmButton: false,
      });
    } 
  };
  const handleSendEmail = async (e) => {
    e.preventDefault();

    const data = {
      type: "Directivo-anual",
      Anio: selectAnio.value,
      email: user.email,
    };

    
    const existe = await existeBoletin(selectAnio.value);
    
    if(!existe){
      return Swal.fire({
        icon: "error",
        title: `No se ha generado el pdf del año ${selectAnio.value}`,
        showConfirmButton: false,
      });
    }
    else{
      await sendMail(JSON.stringify(data));
      return Swal.fire({
        icon: "success",
        title: "Email enviado correctamente!!!!",
        showConfirmButton: false,
      });
    } 
  };

  const handleDowloadPDF = async(e) => {
    e.preventDefault();
    const existe = await existeBoletin(selectAnio.value);
    
    if(!existe){
      Swal.fire({
        icon: "error",
        title: `No se ha generado el pdf del año ${selectAnio.value}`,
        showConfirmButton: false,
      });
    }else{
      descargarBoletin(selectAnio.value);
    }
   
  };

  const aniosOptions = [
    {
      anio: "2019",
    },
    {
      anio: "2020",
    },
    {
      anio: "2021",
    },
    {
      anio: "2022",
    },
  ];

  

  return (
    <>
      <h1>Busqueda de y envío de boletín anual</h1>
      <hr />
      <div className="container">
        <div className="justify-content-center">
          <h4 style={{ textAlign: "center" }}>Buscar</h4>
          <hr />
          <form>
            <Select
              isDisabled={selectAnio.selectedAnio}
              defaultValue={{
                label: "Selecciona un año",
                value: "empty",
              }}
              options={aniosOptions.map((element) => ({
                label: element.anio,
                value: element.anio,
                selectedAnio: true,
              }))}
              onChange={(value, selectedAnio) =>
                handleSelectChangeAnio(value, selectedAnio)
              }
            />
          </form>

          <div className="row mt-2">
            <div className="col-md-4">
              <button
                className="btn btn-portal"
                disabled={!selectAnio.selectedAnio}
                onClick={handleSendEmail}
                style={{"display" : `${user.metodo_contacto.includes('correo') ? '' : 'none'} `}}
              >
                Send by mail
              </button>
            </div>

            {!(user.telegram_id === undefined && user.telegram_id !== "") ? (
              <div className="col-md-4 offset-md-4">
                <button
                  className="btn btn-portal"
                  disabled={!selectAnio.selectedAnio}
                  onClick={handleSendTelegram}
                  style={{"display" : `${user.metodo_contacto.includes('telegram') ? '' : 'none'} `}}
                >
                 
                  Send by telegram
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <button className="btn btn-portal mt-5" onClick={handleDowloadPDF} disabled={!selectAnio.selectedAnio}>
          Download pdf
        </button>
      </div>
    </>
  );
};
