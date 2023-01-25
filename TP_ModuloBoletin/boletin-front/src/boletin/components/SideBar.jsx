import { useRef } from "react";
import { FaStream, FaHome, FaBars, FaFileAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hook/useAuthStore";
import { Navbar } from "./Navbar";
import './SideBar.css';


/*  <NavLink  className={({isActive}) => `text-decoration-none px-3 py-2 d-block ${isActive ? "active" : ""} `} to="#"> <FaHome/>  Dashboard </NavLink> </li>  */

export const SideBar = ({children}) => {

    const {user} = useAuthStore();

    const sidebarRef = useRef();

    const onCloseSideBar = () => {
        sidebarRef.current.className = 'sidebar';
    }

  return (

    <div className='main-container d-flex'>
        <div className='sidebar' ref={sidebarRef} id='side_nav'>
            <div className="header box px-2 pt-3 pb-4 d-flex justify-content-between">
                <h1 className='fs-4'> Boletín para {user.categoria}</h1>
                <button onClick={onCloseSideBar} className='btn d-md-none d-block btn close-btn px-1 py-0 text-white'> <FaStream/> </button>
            </div>

            <ul className="list-unstyled px-2">

                <li className=""> <NavLink  className={({isActive}) => `text-decoration-none px-3 py-2 d-block ${isActive ? "active" : ""} `} to="/dashboard"> <FaHome/>  Dashboard </NavLink> </li>
                
                {
                    user.categoria === 'directivo'
                    ? <div>
                        <li className=""> <NavLink  className={({isActive}) =>  `text-decoration-none px-3 py-2 d-block ${isActive ? "active" : ""} `} to="/directivo-promedio"> <FaFileAlt/>  Boletín Promedio </NavLink></li>
                        <li className=""> <NavLink  className={({isActive}) =>  `text-decoration-none px-3 py-2 d-block ${isActive ? "active" : ""} `} to="/directivo-anual"> <FaFileAlt/>  Boletín Anual </NavLink></li>
                        </div>
                    : <></>
                }
               
                {
                    user.categoria === 'representante'
                    ? <li className=""> <NavLink  className={({isActive}) => `text-decoration-none px-3 py-2 d-block  ${isActive ? "active" : ""} `} to="/Padre"> <FaFileAlt/>  Boletín para padres </NavLink></li>
                    : <></>
                     
                }
                
                {
                    user.categoria === 'alumno'
                    ? <li className=""> <NavLink  className={({isActive}) => `text-decoration-none px-3 py-2 d-block  ${isActive ? "active" : ""} `} to="/alumno-legajo"> <FaFileAlt/>  Boletín para alumnos </NavLink></li>
                    : <></>
                }

                <li className=""> <NavLink  className={({isActive}) => `text-decoration-none px-3 py-2 d-block  ${isActive ? "active" : ""} `} to="/metas"> <FaFileAlt/>  Boletín Metas </NavLink></li>
                <li className=""> <NavLink  className={({isActive}) => `text-decoration-none px-3 py-2 d-block  ${isActive ? "active" : ""} `} to="/consumo"> <FaFileAlt/>  Boletín Consumo </NavLink></li>

            </ul>
            <hr className="h-color mx-2"/>

            <ul className="list-unstyled px-2">
                <li className=""> <a href="#" className="text-decoration-none px-3 py-2 d-block"> <FaBars/>  Configuración </a></li>
                
            </ul>


        </div>
        <div className='content'>

        <Navbar sidebarRef= {sidebarRef} rutas = {children} />





        </div>
    
       
    </div>



    )
}
