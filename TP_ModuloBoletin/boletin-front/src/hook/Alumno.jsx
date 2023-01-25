import Swal from "sweetalert2";
import { useAuthStore } from "../../hook/useAuthStore";
import { useEvents } from "../../hook/useEvents";
import { useForm } from "../../hook/useForm";

const validarLegajo = (legajo) => {
  const onlyNumbersDNI = legajo.toString().replace(/\D/g, "");
  let ex_regular_dni = /^\d{7,8}(?:[-\s]\d{4})?$/;
  if (
    ex_regular_dni.test(onlyNumbersDNI) == true &&
    !/[a-zA-Z]/g.test(legajo) &&
    onlyNumbersDNI === legajo.replace(/(\d)[\s.]+(?=\d)/g, "$1")
  ) {
    return true;
  }

  return false;
};

export const Alumno = () => {
  const { user } = useAuthStore();
  const { legajo, onInputChange, onResetForm } = useForm({ legajo: "" });

  const { sendMail, sendTelegram } = useEvents();

  const handleSubmitTelegram = async (e) => {
    e.preventDefault();

    if(validarLegajo(legajo)){
      
      const dataAlumno = {
        nombre: user.nombre,
        email: user.email,
        legajo: legajo,
        type: "alumno",
        telegram_id: user.telegram_id
      };
      
     const result =  sendTelegram(JSON.stringify(dataAlumno));
     if (result) {
      Swal.fire({
        icon: "success",
        title: "Telegram enviado correctamente!!!!",
        showConfirmButton: false,
      });
      onResetForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al enviar telegram, por favor contacte al administrador",
        showConfirmButton: false,
      });
    }

    }else{
      Swal.fire({
        icon: "error",
        title: "Formato de legajo inválido",
        showConfirmButton: false,
      });
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (validarLegajo(legajo)) {
      const dataAlumno = {
        nombre: user.nombre,
        email: user.email,
        legajo: legajo,
        type: "alumno",
      };
      const result = await sendMail(JSON.stringify(dataAlumno));
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Email enviado correctamente!!!!",
          showConfirmButton: false,
        });
        onResetForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar email, por favor contacte al administrador",
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Formato de legajo inválido",
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <h1>Busqueda y envío de boletin para alumno</h1>

      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form>
            <input
              type="text"
              value={legajo}
              name="legajo"
              onChange={onInputChange}
              className="form-control"
              placeholder="Ingrese su numero de legajo..."
            />
          </form>

          <button
            className="btn btn-success mt-2"
            onClick={handleSubmitEmail}
            type="submit"
          >
            Send by mail
          </button>

          <button
            className="btn btn-success mt-2"
            onClick={handleSubmitTelegram}
            type="submit"
          >
            Send by telegram
          </button>
        </div>
      </div>
    </>
  );
};
