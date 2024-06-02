import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/componentsStyles/DocenteComponent.css";
export const DocenteComponent = ({
  idDocente,
  nombre,
  ap_paterno,
  ap_materno,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.setItem("idDocente", idDocente);
    navigate("contenido", {
      state: {},
    });
  };

    return (
      <div className="card m-4 col-md-4 itemDocente" style={{ width: '18rem' }}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
          className="card-img-top"
          alt="XD"
        />
        <div className="card-body">
          <h5 className="card-title">{nombre} {ap_paterno} {ap_materno}</h5>
          <p className="card-text">
           Docente
          </p>
          <button  className="btn btn-primary" onClick={handleClick}>
            Ver contenido
          </button>
        </div>
      </div>
    );
};
