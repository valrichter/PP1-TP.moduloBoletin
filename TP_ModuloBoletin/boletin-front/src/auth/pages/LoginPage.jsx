import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hook/useAuthStore";
import { useForm } from "../../hook/useForm";

import { useQueryParams } from "../../hook/useQueryParams";


export const LoginPage = () => {
  const { email, nombre, categoria, telegram_id, metodo_contacto, instituto } = useQueryParams();

  const { startLogin, errorMessage } = useAuthStore();


  useEffect(() => {
    if (
      email !== "" &&
      nombre !== "" &&
      categoria !== "" &&
      telegram_id != "" &&
      instituto != "" &&
      metodo_contacto != ""
    ) {
      startLogin({ email, nombre, categoria, telegram_id, metodo_contacto, instituto });
    }

  }, [email]);

  //startLogin({email, nombre, categoria, telegram_id});

  /* const onLoginSubmit = (event) => {
    event.preventDefault();

    startLogin({email, password})

  } */

  /* useEffect(() => {

    if(errorMessage !== undefined){
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }

  }, [errorMessage])
  
 */

  return (
    <>
      <h1>Ingresando...</h1>
      {/* <div className="container mt-5">
        <h1>LoginPage</h1>
        <form onSubmit={onLoginSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div> */}
    </>
  );
};
