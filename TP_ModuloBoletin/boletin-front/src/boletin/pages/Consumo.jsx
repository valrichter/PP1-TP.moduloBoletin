import Swal from "sweetalert2";
import Select from "react-select";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import { useState } from "react";
import { dataJurisdiccion } from "../../data-example/dataJurisdiccion";
import "../../index.css";
import { useEffect } from "react";
export const Consumo = () => {

  const { user, status } = useAuthStore();

  const { sendMail, sendTelegram } = useEvents();

  const meses = [
    { nombre: "Enero", value: "1" },
    { nombre: "Febrero", value: "2" },
    { nombre: "Marzo", value: "3" },
    { nombre: "Abril", value: "4" },
    { nombre: "Mayo", value: "5" },
    { nombre: "Junio", value: "6" },
    { nombre: "Julio", value: "7" },
    { nombre: "Agosto", value: "8" },
    { nombre: "Septiembre", value: "9" },
    { nombre: "Octubre", value: "10" },
    { nombre: "Noviembre", value: "11" },
    { nombre: "Diciembre", value: "12" },
  ];
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



  const [jurisdiccionSeleccionada, setJurisdiccionSeleccionada] = useState({
    selected: false,
    value: "",
  });
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState({
    selected: false,
    value: "",
  });
  const [MesSeleccionada, setMesSeleccionada] = useState({
    selected: false,
    value: "",
  });

  const [jurisdicciones, setJurisdicciones] = useState([]);
  const [instituciones, setInstituciones] = useState([]);

  useEffect(() => {
    fetch("https://www.inkdesign.com.ar/wp-json/mo/v1/jurisdicciones")
      .then((response) => response.json())
      .then((data) => {
        setJurisdicciones(data);
      });
  }, []);

  useEffect(() => {
    if (jurisdiccionSeleccionada.selected) {
      fetch(
        `https://www.inkdesign.com.ar/wp-json/mo/v1/Instituciones/${jurisdiccionSeleccionada.value.value}`
      )
        .then((response) => response.json())
        .then((data) => {
          setInstituciones(data);
        });
    }
  }, [jurisdiccionSeleccionada.selected]);

  const onSendByTelegram = async () => {
    if (user.categoria !== "directivo") {
      return Swal.fire(
        "Error",
        "No está autorizado para utilizar este formulario",
        "error"
      );
    }
    const data = {
        type: "boletin-consumo",
        telegram_id: user.telegram_id,
        Institucion: institucionSeleccionada.value.value,
        Mes: MesSeleccionada.value,
        Anio: selectAnio.value
      };

    const result = sendTelegram(JSON.stringify(data));

    if (result) {
      Swal.fire({
        icon: "success",
        title: "Telegram enviado correctamente!!!!",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al enviar telegram, por favor contacte al administrador",
        showConfirmButton: false,
      });
    }
  };

  const onSendByEmail = async () => {
    if (user.categoria !== "directivo") {
      return Swal.fire(
        "Error",
        "No está autorizado para utilizar este formulario",
        "error"
      );
    }

    const data = {
      type: "boletin-consumo",
      email: user.email,
      Institucion: institucionSeleccionada.value.value,
      Mes: MesSeleccionada.value,
      Anio: selectAnio.value
    };

    const result = await sendMail(JSON.stringify(data));

    if (result) {
      Swal.fire({
        icon: "success",
        title: "Email enviado correctamente!!!!",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al enviar email, por favor contacte al administrador",
        showConfirmButton: false,
      });
    }
  };

  const [selectAnio, setSelectAnio] = useState({
    value: "",
    selectedAnio: false,
  });

  const handleSelectChangeAnio = ({ value, selectedAnio }) => {
    setSelectAnio({ value, selectedAnio });
  };

  return (
    <>
      <h1>Busqueda y envío de boletín de consumo</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
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

            <Select
              isDisabled={!selectAnio.selectedAnio || MesSeleccionada.selected}
              className="mt-2"
              defaultValue={{
                label: "Selecciona un mes",
                value: "empty",
              }}
              options={meses.map((element) => ({
                label: element.nombre,
                value: element.value,
                selected: true,
              }))}
              onChange={(value, selectedAnio) =>
                setMesSeleccionada(value, selectedAnio)
              }
            />

            <Select
              isDisabled={
                !MesSeleccionada.selected || jurisdiccionSeleccionada.selected
              }
              className="mt-2"
              defaultValue={{
                label: "Selecciona una Jurisdicción",
                value: "empty",
              }}
              options={jurisdicciones.map((element) => ({
                label: element.NOMBRE,
                value: element.ID,
                selected: true,
              }))}
              onChange={(value, selected) => {
                setJurisdiccionSeleccionada({ value, selected });
              }}
            />

            <Select
              isDisabled={
                !jurisdiccionSeleccionada.selected ||
                institucionSeleccionada.selected
              }
              className="mt-2"
              defaultValue={{
                label: "Selecciona una Institución",
                value: "empty",
              }}
              options={instituciones.map((element) => ({
                label: element.NOMBRE,
                value: element.ID,
                selected: true,
              }))}
              onChange={(value, selected) => {
                setInstitucionSeleccionada({ value, selected });
              }}
            />
          </form>

          <button
            onClick={onSendByEmail}
            className="btn btn-portal m-2"
            style={{
              display: `${
                user.metodo_contacto.includes("correo") ? "" : "none"
              } `,
            }}
          >
            Send by mail
          </button>

          {!(user.telegram_id === undefined && user.telegram_id !== "") ? (
            <button
              onClick={onSendByTelegram}
              className="btn btn-portal m-2"
              style={{
                display: `${
                  user.metodo_contacto.includes("telegram") ? "" : "none"
                } `,
              }}
            >
              Send by telegram
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="col-7">
          <h4>Resultado</h4>
          <hr />

          <div className="alert alert-success">Buscando boletín</div>
        </div>
      </div>
    </>
  );
};
