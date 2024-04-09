import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/componentsStyles/MateriaComponent.css';
import { CarreraComponent } from './CarreraComponent';

export const MateriaComponent = ({ idMateria, materia, idSemestre}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('docentes', {
      state: {
        idMateria: idMateria,
      },
    });
    sessionStorage.setItem('idMateria', idMateria)
    sessionStorage.setItem('idSemestre', idSemestre)


  };

  return (
    <div
      className='border m-2 p-2  d-flex justify-content-center align-items-center flex-column itemMateria'
      onClick={handleClick}
    >
      <p>{materia}</p>
    </div>
  );
};
