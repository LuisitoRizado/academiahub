import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/componentsStyles/DocenteComponent.css'
export const DocenteComponent = ({idDocente, nombre, ap_paterno, ap_materno}) => {
    const navigate = useNavigate();
    const handleClick = () => {
      sessionStorage.setItem('idDocente', idDocente)
      navigate('contenido', {
        state: {
        },
      });
    };
  
    return (
      <div
        className='border p-2 border-primary d-flex justify-content-center align-items-center flex-column itemDocente'
        onClick={handleClick}
      >
        <p>{nombre} {ap_paterno} {ap_materno}</p>
      </div>
    );
}
