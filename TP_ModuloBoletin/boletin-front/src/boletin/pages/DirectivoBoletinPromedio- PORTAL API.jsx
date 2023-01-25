import Swal from "sweetalert2";
import Select from "react-select";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import { useState } from "react";
import { dataJurisdiccion } from "../../data-example/dataJurisdiccion";
import "../../index.css";
import { useEffect } from "react";
export const DirectivoBoletinPromedio = () => {


  const data = dataJurisdiccion;


  const { user, status } = useAuthStore();

  const { sendMail, sendTelegram } = useEvents();

  const [isLoadingJurisdiccion, setIsLoadingJurisdiccion] = useState(true);

  const [jurisdiccionSeleccionada, setJurisdiccionSeleccionada] = useState({
    selected: false,
    value: "",
  });
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState({
    selected: false,
    value: "",
  });

  const [nivelSeleccionado, setNivelSeleccionado] = useState({
    selected: false,
    value: "",
  });

  const [jurisdicciones, setJurisdicciones] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [niveles, setNiveles] = useState([]);

  useEffect(() => {
    fetch("https://www.inkdesign.com.ar/wp-json/mo/v1/jurisdicciones")
      .then((response) => response.json())
      .then((data) => {
        setJurisdicciones(data);
        setIsLoadingJurisdiccion(false);
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

  useEffect(() => {
    if (institucionSeleccionada.selected) {
      fetch(
        `https://www.inkdesign.com.ar/wp-json/mo/v1/Niveles/${institucionSeleccionada.value.value}`
      )
        .then((response) => response.json())
        .then((data) => {
          setNiveles(data);
        });
    }
  }, [institucionSeleccionada.selected]);

  const onSendByTelegram = async () => {
    if (user.categoria !== "directivo") {
      return Swal.fire(
        "Error",
        "No está autorizado para utilizar este formulario",
        "error"
      );
    }
    const data = {
      type: "Directivo-promedio",
      telegram_id: user.telegram_id,
      jurisdiccion: selectJurisdiccion.value,
      idInstitucion: selectInstituto.value,
      idGrado: selectCurso.value,
      idMateria: selectMateria.value,
      nombre: user.nombre,
      anio: selectAnio.value,
      idNivel: selectNivel.value,
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
      type: "Directivo-promedio",
      email: user.email,
      jurisdiccion: selectJurisdiccion.value,
      idInstitucion: selectInstituto.value,
      idGrado: selectCurso.value,
      idMateria: selectMateria.value,
      nombre: user.nombre,
      anio: selectAnio.value,
      idNivel: selectNivel.value,
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

  /* const handleSelectChangeJurisdiccion = ({
    value,
    data,
    indexJur,
    selectedJur,
  }) => {
    setSelectJurisdiccion({ value, data, indexJur, selectedJur });
  };

  const handleSelectChangeInstitucion = ({
    value,
    data,
    indexInst,
    selectedIns,
  }) => {
    setSelectInstituto({ value, data, indexInst, selectedIns });
  };

  const handleSelectChangeCurso = ({
    value,
    data,
    indexCurso,
    selectedCurso,
  }) => {
    setSelectCurso({ value, data, indexCurso, selectedCurso });
  };

  const handleSelectChangeMateria = ({
    value,
    data,
    indexMateria,
    selectedMateria,
  }) => {
    setSelectMateria({ value, data, indexMateria, selectedMateria });
  };

  const handleSelectChangeNivel = ({
    value,
    data,
    indexNivel,
    selectedNivel,
  }) => {
    setSelectNivel({ value, data, indexNivel, selectedNivel });
  };*/

  const handleSelectChangeAnio = ({ value, selectedAnio }) => {
    setSelectAnio({ value, selectedAnio });
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
      <h1>Busqueda y envío de boletín promedio</h1>
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
              isDisabled={!selectAnio.selectedAnio}
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

            <Select
              className="mt-2"
              defaultValue={{
                label: "Selecciona un nivel",
                value: "empty",
              }}
              options={niveles.map((element) => ({
                label: element.NOMBRE,
                value: element.LETRA,
                selected: true,
              }))}
              onChange={(value, selected) => {
                setNivelSeleccionado({ value, selected });
              }}
            />

            <Select
              className="mt-2"
              defaultValue={{
                label: "Selecciona un curso",
                value: "empty",
              }}
              options={data.map((element) => ({
              }))}
              onChange={(value, selected) => {
              }}
            />
            {/*<Select
              isDisabled={
                !selectInstituto.selectedIns || selectNivel.value !== ""
              }
              className="mt-2"
              defaultValue={{
                label: "Selecciona un nivel",
                value: "empty",
              }}
              options={data[selectJurisdiccion.indexJur].Institutos[
                selectInstituto.indexInst
              ].Niveles.map((element, indexNivel) => ({
                label: element.Nivel,
                value: element.id,
                data: element.Nivel,
                indexNivel,
                selectedNivel: true,
              }))}
              onChange={(value, indexNivel, selectedNivel) =>
                handleSelectChangeNivel(value, indexNivel, selectedNivel)
              }
            />

            <Select
              isDisabled={selectNivel.value === "" || selectCurso.selectedCurso}
              className="mt-2"
              defaultValue={{ label: "Selecciona un curso", value: "empty" }}
              options={data[selectJurisdiccion.indexJur].Institutos[
                selectInstituto.indexInst
              ].Niveles[selectNivel.indexNivel].Cursos.map(
                (element, indexCurso) => ({
                  label: element.Curso,
                  value: element.id,
                  data: element.Curso,
                  indexCurso,
                  selectedCurso: true,
                })
              )}
              onChange={(value, indexCurso, selectedCurso) =>
                handleSelectChangeCurso(value, indexCurso, selectedCurso)
              }
            />

            <Select
              isDisabled={
                selectCurso.value === "" || selectMateria.selectedMateria
              }
              className="mt-2"
              defaultValue={{ label: "Selecciona una materia", value: "empty" }}
              options={data[selectJurisdiccion.indexJur].Institutos[
                selectInstituto.indexInst
              ].Niveles[selectNivel.indexNivel].Cursos[
                selectCurso.indexCurso
              ].Materias.map((element, indexMateria) => ({
                label: element.Materia,
                value: element.id,
                data: element.Materia,
                indexMateria,
                selectedMateria: true,
              }))}
              onChange={(value, indexMateria, selectedMateria) =>
                handleSelectChangeMateria(value, indexMateria, selectedMateria)
              }
            /> */}
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
