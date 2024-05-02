import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components';
import '../styles/componentsStyles/ContenidoPage.css'
export const ContenidoPage = () => {
  const [archivosMateria, setArchivosMateria] = useState([]);
  const [materia, setMateria] = useState();
  const [carrera, setCarrera] = useState();
  const [semestre, setSemestre] = useState();
  const [docente, setDocente] = useState()
  const [materiaSeleccioanda, setMateriaSeleccioanda] = useState();

  function formatearFecha(fecha) {
    const fechaOriginal = new Date(fecha);
    const año = fechaOriginal.getFullYear();
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaOriginal.getDate().toString().padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }


//https://webapi-fsva.onrender.com
//https://webapi-fsva.onrender.com/materiaSeleccionada
  const consultarUnion = async (idCarrera, idSemestre, idMateria) => {
    try {
      const response = await fetch(`https://webapi-fsva.onrender.com/materiaSeleccionada/${idCarrera}/${idSemestre}/${idMateria}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos de la unión:', data);
      setMateriaSeleccioanda(data.idUnion);
    } catch (error) {
      console.error('Error al consultar la unión:', error.message);
    }
  };

  const cargarTodosLosArchivos = async () => {
    try {
      const response = await fetch(`https://webapi-fsva.onrender.com/archivosdemateria/${materiaSeleccioanda}/${docente}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Archivos de la materia: ', data);
      setArchivosMateria(data);
    } catch (error) {
      console.error('Error al cargar los archivos:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const idCarrera = sessionStorage.getItem('idCarrera');
      const idMateria = sessionStorage.getItem('idMateria');
      const idSemestre = sessionStorage.getItem('idSemestre');
      const idDocente = sessionStorage.getItem('idDocente')
      console.log('idCarrera:', idCarrera);
      console.log('idMateria:', idMateria);
      console.log('idSemestre:', idSemestre);

      setCarrera(idCarrera);
      setMateria(idMateria);
      setSemestre(idSemestre);
      setDocente(idDocente)
      await consultarUnion(idCarrera, idSemestre, idMateria);
      cargarTodosLosArchivos();
    };

    fetchData();
  }, [materiaSeleccioanda]);

  return (
    <div>
      <Navbar />
      Contenido de la página

      {/*Boton magico para acceder a subir archivo */}


      {/*Estructura de la pagina */}

      <div className="header row d-flex justify-content-center align-items-center">
        <input type="text" className='col-sm-3' />
        <div class="dropdown col-sm-2">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categoria
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
        <div class="dropdown col-sm-2">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Ordenar por
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
        <div class="dropdown col-sm-2">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown button
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
        <NavLink className='btn btn-primary border border-primary col-sm-2 m-2 d-flex justify-content-center align-items-center flex-column' to={'upload'} >

          Subir archivo +
        </NavLink>
      </div>
      {/*Encabezado de la tabla */}
      <br />
      <br />
      <br />
      <div className="tableHeader row d-flex flex-row justify-content-center align-items-center text-center border">
        <h5 className='col-sm-3'>Archivo</h5>
        <h5 className='col-sm-3'>Categoria</h5>
        <h5 className='col-sm-3'>Fecha subida</h5>
        <h5 className='col-sm-3'>Tipo</h5>

      </div>
      {/*Parte de la tabla donde se muestran todos los archivos. */}
      {archivosMateria.length > 0 ?
        archivosMateria.map(archivo => (
          <div key={archivo.id} className='row d-flex flex-row justify-content-center align-items-center text-center border'>
            <div className='col-sm-3 row' >
              <img className='col-sm-6 h-25 w-25' src='https://cdn-icons-png.flaticon.com/512/4208/4208479.png' alt="imagen" />
              <a href={archivo.url} target="_blank" rel="noopener noreferrer" className='col-sm-6 d-flex justify-content-center align-items-center' >
                {archivo.nombre}
              </a>
            </div>

            <b className='col-sm-3 d-flex justify-content-center align-items-center'>{archivo.categoria}</b>
            <b className='col-sm-3 d-flex justify-content-center align-items-center'>
              {archivo.FechaModificacion ? formatearFecha(archivo.FechaModificacion) : 'Sin fecha para mostrar'}
            </b>
            <b className='col-sm-3 d-flex justify-content-center align-items-center'></b>
          </div>
        ))
        : <div className='d-flex justify-content-center align-items-center flex-column mt-2'>
          <img src="https://cdn4.iconfinder.com/data/icons/computer-emoticons/512/Sad-Emoji-Emotion-Face-Expression-Feeling_1-512.png" alt="" className='notFoundImage' />
          <h4 className='text-center text-primary'>¡OOPS!</h4>
          <h4 className='text-center text-primary'>Parece que aún nadie ha subido contenido para esta materia. ¡Sé el primero!</h4>
          <NavLink className='btn btn-primary border border-primary col-sm-2 m-2 d-flex justify-content-center align-items-center flex-column' to={'upload'} >

            Subir archivo +
          </NavLink>
        </div>
      }


    </div>
  );
};
