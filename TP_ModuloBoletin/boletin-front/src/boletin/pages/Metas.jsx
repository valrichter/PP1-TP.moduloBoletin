import { useEffect, useState } from "react";
import Select from "react-select";
import "../../index.css";
import { dispositivosAhorro } from "../../../api/ahorroApi";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import Swal from "sweetalert2";

export const Metas = () => {
  const { sendMail, sendTelegram, sendMetasCumplidas } = useEvents();

  const { user } = useAuthStore();
  const [dispositivos, setDispositivos] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://ahorro-energetico-api-desc.herokuapp.com/api/descripciones")
      .then((response) => response.json())
      .then((data) => {
        setDispositivos(data);
        setIsLoading(false);
      });
  }, []);

  const [selectDispositivo, setSelectDispositivo] = useState({
    id: "",
    selectedDispositivo: false,
  });

  const handleSelectChange = (value, selectedDispositivo) => {
    setSelectDispositivo({ value, selectedDispositivo });
  };

  const handleSendEmail = async () => {
    const data = {
      type: `${user.categoria}-boletin-dispositivo`,
      email: user.email,
      jurisdiccion: "Ciudad Autónoma de Buenos Aires",
      institucion: "La manzana de isaac",
      dispositivo: selectDispositivo.value.value,
    };
    await sendMail(JSON.stringify(data));

    return Swal.fire({
      icon: "success",
      title: "Email enviado correctamente!!!!",
      showConfirmButton: false,
    });
  };

  const handleSendTelegram = async () => {
    const data = {
      type: `${user.categoria}-boletin-dispositivo`,
      telegram_id: user.telegram_id,
      jurisdiccion: "Ciudad Autónoma de Buenos Aires",
      institucion: "La manzana de isaac",
      dispositivo: selectDispositivo.value.value,
    };

    await sendTelegram(JSON.stringify(data));

    return Swal.fire({
      icon: "success",
      title: "Telegram enviado correctamente!!!!",
      showConfirmButton: false,
    });
  };

  const handleSendMetasCumplidas = async() => {
    if( user.metodo_contacto.includes("correo")){
     
     await sendMetasCumplidas({email: user.email});
     return Swal.fire({
      icon: "success",
      title: "Correo enviado correctamente!!!!",
      showConfirmButton: false,
    });
    }else{
      await sendMetasCumplidas({telegram_id: user.telegram_id});
     return Swal.fire({
      icon: "success",
      title: "Telegram enviado correctamente!!!!",
      showConfirmButton: false,
    });
    }
  }


  if (isLoading) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <>
      <h1>Busqueda y envío de boletines dispositivos </h1>
      <hr />
      <div className="row">
        <div className="col-10">
          <h4>Obtener metas vigentes y no vigentes</h4>
          <hr />

          <form>
            <Select
              className="mt-2"
              defaultValue={{
                label: "Selecciona un dispositivo",
                value: "empty",
              }}
              options={dispositivos.map((element) => ({
                label: element.descripcion,
                value: element.id,
                selectedDispositivo: true,
              }))}
              onChange={(value, selectedDispositivo) =>
                handleSelectChange(value, selectedDispositivo)
              }
            />
          </form>

          <div className="row mt-2">
            <div className="col-md-4">
              <button
                onClick={handleSendEmail}
                disabled={!selectDispositivo.selectedDispositivo}
                className="btn btn-portal"
                style={{
                  display: `${
                    user.metodo_contacto.includes("correo") ? "" : "none"
                  } `,
                }}
              >
                Send by mail
              </button>
            </div>
            {!(user.telegram_id === undefined && user.telegram_id !== "") ? (
              <div className="col-md-4 offset-md-4">
                <button
                  className="btn btn-portal"
                  disabled={!selectDispositivo.selectedDispositivo}
                  onClick={handleSendTelegram}
                  style={{
                    display: `${
                      user.metodo_contacto.includes("telegram") ? "" : "none"
                    } `,
                  }}
                >
                  Send by telegram
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <hr />
          <button className="btn btn-portal" onClick={handleSendMetasCumplidas}> Solicitar metas cumpidas</button>
        </div>
      </div>
    </>
  );
};
