import React from "react";
import { FaStream, FaList } from "react-icons/fa";
import { useAuthStore } from "../../hook/useAuthStore";

import './Navbar.css';

export const Navbar = ({ sidebarRef, rutas }) => {

  const {user} = useAuthStore();


  const onOpenSideBar = () => {
    sidebarRef.current.className = sidebarRef.current.className + " active";
  };

  return (
    <>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <div className="d-flex jutify-content-between d-md-none d-block">
            <a className="navbar-brand fs-4 boletin-a" href="#">
              Boletín
            </a>
            <button onClick={onOpenSideBar} className="btn px-1 py-0 open-btn">
              {" "}
              <FaStream />{" "}
            </button>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaList/>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {user?.nombre.toUpperCase()}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <div className="container px-3 pt-4">
        {rutas}


      </div> 
      
     
      



    </>
  );
};
