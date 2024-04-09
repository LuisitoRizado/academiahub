import React from 'react'
import { useState, useCallback, useEffect, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components'
//Estilos
import '../styles/componentsStyles/UploadArchivo.css'
import { AuthContext } from '../../auth/context/AuthContext'
export const UploadArchivoPage = () => {
  const location = useLocation()
  const parametros = location.state;
  const { user } = useContext(AuthContext);

  //Hooks
  const [materia, setMateria] = useState()
  const [carrera, setCarrera] = useState()
  const [semestre, setSemestre] = useState()
  const [docente, setDocente] = useState()
  const [materiaNombre, setMateriaNombre] = useState()
  const [docenteNombre, setDocenteNombre] = useState()
  const [materiaSeleccioanda, setMateriaSeleccioanda] = useState()

  //const [file, setFile] = useState()
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles[0])
    // Do something with the files
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })
  //Funciones
  const agregarArchivoABDD = async (idUser, publicId, nombre, url) => {
    try {
      const response = await fetch('http://localhost:3000/archivo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Datos del archivo
          idUser: idUser,
          publicId: publicId,
          nombre: nombre,
          url: url,
        }),
      });

      const data = await response.json();
      console.log(response); // Agrega esta línea para imprimir la respuesta completa
      console.log(data);
      //Ejecutamos la funcion de agregar a relacion
      agregarArchivoATablaUnion(docente, 1, 2, data.idArchivo, materiaSeleccioanda)
    } catch (error) {
      console.error('Error al agregar archivo a la base de datos:', error);
    }
  };
  //Funcion para agregar a la tabla union, se ejecuta despues de que el archivo se haya subido.
  const agregarArchivoATablaUnion = async (idDocente, idCategoria, idEstado, idArchivo, idMateria) => {
    try {
      const response = await fetch('http://localhost:3000/archivodemateria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Datos del archivo
          idDocente: idDocente,
          idCategoria: idCategoria,
          idEstado: idEstado,
          idArchivo: idArchivo,
          idMateria: idMateria
        }),
      });

      const data = await response.json();
      console.log(response); // Agrega esta línea para imprimir la respuesta completa
      console.log(data);
      //Ejecutamos la funcion de agregar a relacion
    } catch (error) {
      console.error('Error al agregar archivo a la base de datos:', error);
    }
  }
  //Consulta la materia
  const consultarUnion = async (idCarrera, idSemestre, idMateria) => {
    try {
      const response = await fetch(`http://localhost:3000/materiaSeleccionada/${idCarrera}/${idSemestre}/${idMateria}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos de la unión:', data);
      setMateriaSeleccioanda(data.idUnion)
    } catch (error) {
      console.error('Error al consultar la unión:', error.message);
    }
  };
  //Funcion para manejar el archivo a subir/
  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    formData.append('upload_preset', 'uqiqpoca')
    formData.append('api_key', '511399376121436')

    //Peticion
    const res = await fetch('https://api.cloudinary.com/v1_1/dcun8q7tb/image/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    //Vamos a guardar la id de la imagen en la base de datos.
    console.log(data)
    agregarArchivoABDD(user.id, data.public_id, data.original_filename, data.url)

  }
  //Funcion para consultar la materia y el docente
  const consultarMateriaYDocente = async (idMateria, idDocente) => {
    try {
      const response = await fetch(`http://localhost:3000/docente/${idDocente}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Nombre docente : :', data);
      setDocenteNombre(data.Nombre + ' ' + data.Ap_Paterno + ' ' + data.Ap_Materno)
    } catch (error) {
      console.error('Error al consultar la unión:', error.message);
    }

    //Hacemos la peticion de la materia
    try {
      const response = await fetch(`http://localhost:3000/materia/${idMateria}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Nombre materia : :', data);
      setMateriaNombre(data.Materia)
    } catch (error) {
      console.error('Error al consultar la unión:', error.message);
    }


  }
  //use statte
  useEffect(() => {
    // Al cargar la pagina, vamos a identificar en cual carrera, materia y semestre estamos.
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
    // Consultamos el id de la union
    consultarUnion(idCarrera, idSemestre, idMateria);
    //Buscamos el docente y materia
    consultarMateriaYDocente(idMateria, idDocente)
  }, []);


  return (
    <div className=' '>
      <Navbar />
      <div className="uploadContainer  d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <form onSubmit={handleSubmit} className='row container h-75 d-flex justify-content-around align-items-center border rounded'>
          <div {...getRootProps()}
            className='contenedorDrag d-flex justify-content-center flex-column align-items-center col-sm-6 h-100'
          >
            <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" className='mt-2' alt="" height={100} width={100} />
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Choose a file or drag here</p>
            }
            <button className='btn btn-outline-primary mt-2'>Subir archivo</button>
            <p className='mt-2'>Capacidad maxima : <b>5mb</b> </p>
            <p className='mt-2'>Archivos permitidos : <b> .PNG , .JPG , .PDF</b> </p>
          </div>
          <div className='optionsFormContainer mx-2 col-sm-5 d-flex flex-column align-items-left justify-content-around h-100'>
            <label htmlFor="">Nombre del archivo</label>
            <input type="text" className='form-control' />
            <label htmlFor="">Categoria</label>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Categoria
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Examen</a></li>
                <li><a class="dropdown-item" href="#">Practica</a></li>
                <li><a class="dropdown-item" href="#">Actividad</a></li>
              </ul>
            </div>
            <p>Materia : {typeof materiaNombre === 'string' && materiaNombre !== '' ? (
              <b className='materiaText'>{materiaNombre}</b>
            ) : (
              <b>Sin seleccionar</b>
            )}
            </p>
            <p>Docente : {typeof docenteNombre === 'string' && materiaNombre !== '' ? (
              <b className='materiaText'>{docenteNombre}</b>
            ) : (
              <b>Sin seleccionar</b>
            )}</p>

            <button className='btn btn-primary'>Enviar</button>

          </div>
          {
            acceptedFiles[0] && (<img src={URL.createObjectURL(acceptedFiles[0])} />)
          }
        </form>

      </div>

    </div>
  )
}
