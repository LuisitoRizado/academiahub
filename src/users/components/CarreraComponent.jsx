import React from 'react'
import '../styles/componentsStyles/CarreraComponent.css'
import { NavLink } from 'react-router-dom'
import { FaComputer } from "react-icons/fa6";
import { FaIndustry } from "react-icons/fa6";
import { GiCircuitry } from "react-icons/gi";
import { GiMechanicalArm } from "react-icons/gi";
import { GiMechanicGarage } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";
import { MdOutlineFactory } from "react-icons/md";
export const CarreraComponent = ({ id, carrera, icon }) => {
    const handleCarrera = () => {
        //Guardamos el id de la carrera en el sessionStorage
        sessionStorage.setItem('idCarrera',parseInt(id));
    }
    return (
        <NavLink onClick={handleCarrera}  className='p-4 item border  col-md-3 m-2 d-flex justify-content-center align-items-center flex-column' to={'materias'} >
          {
                carrera === 'Sistemas computacionales' ? (
                    <FaComputer fontSize={150} />
                ) : carrera === 'Industrial' ? (
                    <MdOutlineFactory fontSize={150} />
                ) :carrera === 'Electronica' ? (
                    <GiCircuitry fontSize={150} />
                ) : carrera === 'Mecanica' ? (
                    <GiMechanicGarage fontSize={150} />
                ) :carrera === 'Mecatronica' ? (
                    <GiMechanicalArm fontSize={150} />
                ) :carrera === 'Electrica' ? (
                    <MdElectricBolt fontSize={150} />
                ) : (
                    <div>Default Icon or Text</div>
                )
            }
            <br />
            <h5>{carrera}</h5>
        </NavLink>
    )
}
