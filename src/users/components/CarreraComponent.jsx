import React from 'react'
import '../styles/componentsStyles/CarreraComponent.css'
import { NavLink } from 'react-router-dom'
export const CarreraComponent = ({ id, carrera, icon }) => {
    const handleCarrera = () => {
        //Guardamos el id de la carrera en el sessionStorage
        sessionStorage.setItem('idCarrera',parseInt(id));
    }
    return (
        <NavLink onClick={handleCarrera}  className='p-4 item border border-primary col-md-3 m-2 d-flex justify-content-center align-items-center flex-column' to={'materias'} >
            <img src={"https://cdn-icons-png.flaticon.com/512/780/780457.png"} className='w-75 h-75' alt="Icono de la carrera" />
            <h5>{carrera}</h5>
        </NavLink>
    )
}
