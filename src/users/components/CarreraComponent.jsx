import React from 'react'
import '../styles/componentsStyles/CarreraComponent.css'
import { NavLink } from 'react-router-dom'
export const CarreraComponent = ({ id, carrera, icon }) => {
    const handleCarrera = () => {
        //Guardamos el id de la carrera en el sessionStorage
        sessionStorage.setItem('idCarrera',parseInt(id));
    }
    return (
        <NavLink onClick={handleCarrera}  className='item border border-primary col-md-3 m-2 d-flex justify-content-center align-items-center flex-column' to={'materias'} >
            <img src={icon} alt="Icono de la carrera" />
            <h5>{carrera}</h5>
        </NavLink>
    )
}
