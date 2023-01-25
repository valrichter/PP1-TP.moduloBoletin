import Swal from "sweetalert2";
import Select from "react-select";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import { useState } from "react";
import { dataJurisdiccion } from "../../data-example/dataJurisdiccion";
import '../../index.css';
export const DirectivoBoletinPromedio = () => {
  const { user, status } = useAuthStore();

  const { sendMail, sendTelegram } = useEvents();

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
      idNivel: selectNivel.value
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
      idNivel: selectNivel.value
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

  const data = dataJurisdiccion;

  const [selectJurisdiccion, setSelectJurisdiccion] = useState({
    value: "",
    data: "",
    indexJur: 0,
    selectedJur: false,
  });
  const [selectInstituto, setSelectInstituto] = useState({
    value: "",
    data: "",
    indexInst: 0,
    selectedIns: false,
  });
  const [selectCurso, setSelectCurso] = useState({
    value: "",
    data: "",
    indexCurso: 0,
    selectedCurso: false,
  });
  const [selectMateria, setSelectMateria] = useState({
    value: "",
    data: "",
    indexMateria: 0,
    selectedMateria: false,
  });
  const [selectNivel, setSelectNivel] = useState({
    value: "",
    data: "",
    indexNivel: 0,
    selectedNivel: false,
  });

  const [selectAnio, setSelectAnio] = useState({
    value: "",
    selectedAnio: false,
  });

  const handleSelectChangeJurisdiccion = ({
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
  };

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
                selectedAnio: true
              }))}
              onChange={(value, selectedAnio) =>
                handleSelectChangeAnio(value, selectedAnio)
              }
            />

            <Select
              isDisabled={
                selectJurisdiccion.selectedJur || !selectAnio.selectedAnio
              }
              className="mt-2"
              defaultValue={{
                label: "Selecciona una Jurisdicción",
                value: "empty",
              }}
              options={data.map((element, indexJur) => ({
                label: element.Jurisdiccion,
                data: element.Jurisdiccion,
                value: element.id,
                indexJur,
                selectedJur: true,
              }))}
              onChange={(value, indexJur, selectedJur) =>
                handleSelectChangeJurisdiccion(value, indexJur, selectedJur)
              }
            />

            <Select
              isDisabled={
                selectJurisdiccion.value === "" || selectInstituto.selectedIns
              }
              className="mt-2"
              defaultValue={{
                label: "Selecciona una Institución",
                value: "empty",
              }}
              options={data[selectJurisdiccion.indexJur].Institutos.map(
                (element, indexInst) => ({
                  label: element.Instituto,
                  value: element.id,
                  data: element.Instituto,
                  indexInst,
                  selectedIns: true,
                })
              )}
              onChange={(value, indexInst, selectedIns) =>
                handleSelectChangeInstitucion(value, indexInst, selectedIns)
              }
            />
            <Select
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
            />
          </form>

          <button
            disabled={
              !(
                selectJurisdiccion.selectedJur &&
                selectInstituto.selectedIns &&
                selectCurso.selectedCurso &&
                selectMateria.selectedMateria
              )
            }
            onClick={onSendByEmail}
            className="btn btn-portal m-2"
            style={{"display" : `${user.metodo_contacto.includes('correo') ? '' : 'none'} `}}
          >
            Send by mail
          </button>
       

          {!(user.telegram_id === undefined && user.telegram_id !== "") ? (
            <button
              disabled={
                !(
                  selectJurisdiccion.selectedJur &&
                  selectInstituto.selectedIns &&
                  selectCurso.selectedCurso &&
                  selectMateria.selectedMateria &&
                  user.telegram_id !== ""
                )
              }
              onClick={onSendByTelegram}
              className="btn btn-portal m-2"
              style={{"display" : `${user.metodo_contacto.includes('telegram') ? '' : 'none'} `}}
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
