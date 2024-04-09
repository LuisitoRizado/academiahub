import React, { useState, useEffect } from 'react';
import { MateriaComponent } from '../components/MateriaComponent';
import { Navbar } from '../components';
export const MateriasPage = () => {
  const [semestres, setSemestres] = useState([]);
  const [materiasPorSemestre, setMateriasPorSemestre] = useState({});
  const [idCarrera, setIdCarrera] = useState();

  const obtenerTodosLosSemestres = async () => {
    try {
      const response = await fetch('http://localhost:3000/cantidadSemestres');
      const data = await response.json();
      setSemestres(data);
    } catch (error) {
      console.error('Error al obtener semestres:', error);
    }
  };

  const consultarTodasLasMaterias = async (carrera, semestre) => {
    try {
      const response = await fetch(`http://localhost:3000/materiasPorSemestreYCarrera/${carrera}/${semestre}`);
      const data = await response.json();
      
      // Actualiza el estado de las materias para el semestre actual
      setMateriasPorSemestre(prevState => ({
        ...prevState,
        [semestre]: data
      }));
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  useEffect(() => {
    // Obtenemos la carrera
    setIdCarrera(sessionStorage.getItem('idCarrera'));

    // Llamamos a la función para contar los semestres
    obtenerTodosLosSemestres();
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente

  useEffect(() => {
    // Evitar llamadas innecesarias si idCarrera o semestres cambian
    if (idCarrera && semestres.length > 0) {
      // Llamamos a cargarMaterias dentro de un efecto por cada cambio en semestres o idCarrera
      semestres.forEach(semestre => {
        consultarTodasLasMaterias(idCarrera, semestre.idSemestre);
      });
    }
  }, [idCarrera, semestres]);

  return (
    <div>
      <Navbar />
      <br />
      <h4>Selecciona la materia</h4>
      <br />
      <div className="containerMateriasPorSemestre row">
        {semestres.map(semestre => (
          <div key={semestre.idSemestre} className='col text-bold text-center'>
            <h5>{semestre.Semestre} º Semestre</h5>
            {materiasPorSemestre[semestre.idSemestre]?.map(materia => (
              <MateriaComponent idMateria={materia.idMateria} materia={materia.Materia} idSemestre={semestre.idSemestre}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
