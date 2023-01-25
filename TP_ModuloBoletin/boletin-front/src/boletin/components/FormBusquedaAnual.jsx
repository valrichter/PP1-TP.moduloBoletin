import Swal from "sweetalert2";
import Select from "react-select";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import { useState } from "react";
import { dataJurisdiccion } from "../../data-example/dataJurisdiccion";

export const FormBusquedaAnual = ({ categoria }) => {
  const { user, status } = useAuthStore();

  const { sendMail, dataPromedio ,sendTelegram } = useEvents();

   

  const onSendByTelegram = async () => {
    if (user.categoria !== categoria) {
      return Swal.fire(
        "Error",
        "No está autorizado para utilizar este formulario",
        "error"
      );
    }

    const promedio = await dataPromedio(selectJurisdiccion.value, selectInstituto.value, selectCurso.value, selectMateria.value);
    if(promedio === false){
      return Swal.fire(
        "Error",
        "Error al solicitar promedio, comuniquese con el administrador",
        "error"
      );
    }

    if (user.telegram_id && user.telegram_id != "") {
      const result = await sendTelegram({
        jurisdiccion: selectJurisdiccion.data,
        instituto: selectInstituto.data,
        curso: selectCurso.data,
        materia: selectMateria.data,
        nombre: user.nombre,
        telegram_id: user.telegram_id,
        promedio
      });

      if (result) {
        {
          Swal.fire({
            icon: "success",
            title: "Telegram enviado correctamente!!!!",
            showConfirmButton: false,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title:
            "Error al enviar telegram, por favor contacte al administrador",
          showConfirmButton: false,
        });
      }
    } else{
      Swal.fire({
        icon: "error",
        title:
          "Error al enviar telegram, por favor asocie un id de telegram a la cuenta",
        showConfirmButton: false,
      });
    }
  };

  const onSendByEmail = async () => {
    if (user.categoria !== categoria) {
      return Swal.fire(
        "Error",
        "No está autorizado para utilizar este formulario",
        "error"
      );
    }

    const promedio = await dataPromedio(selectJurisdiccion.value, selectInstituto.value, selectCurso.value, selectMateria.value);
    if(promedio === false){
      return Swal.fire(
        "Error",
        "Error al solicitar promedio, comuniquese con el administrador",
        "error"
      );
    }


    const result = await sendMail({
      email: user.email,
      jurisdiccion: selectJurisdiccion.data,
      instituto: selectInstituto.data,
      curso: selectCurso.data,
      materia: selectMateria.data,
      nombre: user.nombre,
      promedio
    });

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

  const handleSelectChangeJurisdiccion = ({ value, data, indexJur, selectedJur }) => {
    setSelectJurisdiccion({ value, data, indexJur, selectedJur });
  };

  const handleSelectChangeInstitucion = ({ value, data, indexInst, selectedIns }) => {
    setSelectInstituto({ value, data, indexInst, selectedIns });
  };

  const handleSelectChangeCurso = ({ value, data, indexCurso, selectedCurso }) => {
    setSelectCurso({ value, data, indexCurso, selectedCurso });
  };

  const handleSelectChangeMateria = ({value, data, indexMateria,selectedMateria,}) => {
    setSelectMateria({ value, data, indexMateria, selectedMateria });
  };

  const onResetForm = () => {
    setSelectJurisdiccion({ valueIndex: "", data:"" ,indexJur: 0, selectedJur: false });
    setSelectInstituto({ valueIndex: "", data:"", indexInst: 0, selectedIns: false });
    setSelectCurso({ valueIndex: "", data:"", indexCurso: 0, selectedCurso: false });
    setSelectMateria({ valueIndex: "", data:"", indexMateria: 0, selectedMateria: false });
  };

  

  return (
    <>
      <h1>
        Busqueda y envío de boletín anual
      </h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form>
            <Select
              isDisabled={selectJurisdiccion.selectedJur}
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
                selectInstituto.value === "" || selectCurso.selectedCurso
              }
              className="mt-2"
              defaultValue={{ label: "Selecciona un curso", value: "empty" }}
              options={data[selectJurisdiccion.indexJur].Institutos[
                selectInstituto.indexInst
              ].Cursos.map((element, indexCurso) => ({
                label: element.Curso,
                value: element.id,
                data: element.Curso,
                indexCurso,
                selectedCurso: true,
              }))}
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
              ].Cursos[selectCurso.indexCurso].Materias.map(
                (element, indexMateria) => ({
                  label: element.Materia,
                  value: element.id,
                  data: element.Materia,
                  indexMateria,
                  selectedMateria: true,
                })
              )}
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
            className="btn btn-outline-info m-2"
          >
            Send by mail
          </button>
          <button
            disabled={
              !(
                selectJurisdiccion.selectedJur &&
                selectInstituto.selectedIns &&
                selectCurso.selectedCurso &&
                selectMateria.selectedMateria
              )
            }
            onClick={onResetForm}
            className="btn btn-outline-info mt-2 m-2"
          >
            Reset
          </button>

          {user.telegram_id !== "" ? (
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
              className="btn btn-outline-info m-2"
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

          <div className="alert alert-info">Buscando boletín</div>
        </div>
      </div>
    </>
  );
};
