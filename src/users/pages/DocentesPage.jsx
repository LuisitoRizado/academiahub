import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DocenteComponent } from '../components/DocenteComponent';
import { Navbar } from '../components';
export const DocentesPage = () => {
    const location = useLocation()
    const parametros = location.state;
    console.log(location)

    //Hooks
    const [docentes, setDocentes] = useState([])
    //Funciones
    const cargarTodosLosDocentesDeMateria = async() =>{
        try {
            const response = await fetch('https://webapi-fsva.onrender.com/materiasImpartidas/'+parametros.idMateria);
            const data = await response.json();
            setDocentes(data);
            docentes.array.forEach(docente => {
              console.log( 'name' + docente)
            });

          } catch (error) {
            console.error('Error al obtener semestres:', error);
          }
    }
    //UseEffect
    useEffect(() => {
      //Cargamos todos los docentes de la materia seleccionada
      cargarTodosLosDocentesDeMateria()
    }, [])
    
  return (
    
    <div>
      <Navbar />
       
        <h5 className='m-4'>Selecciona un docente</h5>
        <div className='row d-flex justify-content-center align-items-center'>

        {
          docentes.length > 0 ?
            docentes.map(docente =>(
                <>
                <DocenteComponent idDocente={docente.idDocente} nombre={docente.Nombre} ap_paterno={docente.Ap_Paterno} ap_materno={docente.Ap_Materno} />
                </>
            ))
            :
            <div className='d-flex justify-content-center align-items-center flex-column mt-2'>
          <img src="https://cdn4.iconfinder.com/data/icons/computer-emoticons/512/Sad-Emoji-Emotion-Face-Expression-Feeling_1-512.png" alt="" className='notFoundImage' />
          <h4 className='text-center text-primary'>¡OOPS!</h4>
          <h4 className='text-center text-primary'>Parece que no hay docentes registrados en esta materia !</h4>
           
        </div>
        }
        </div>
    </div>
  )
}
