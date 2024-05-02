import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components';
import '../styles/componentsStyles/UploadArchivo.css';
import { AuthContext } from '../../auth/context/AuthContext';

export const UploadArchivoPage = () => {
  const location = useLocation();
  const parametros = location.state;
  const { user } = useContext(AuthContext);

  // Hooks
  const [materia, setMateria] = useState();
  const [carrera, setCarrera] = useState();
  const [semestre, setSemestre] = useState();
  const [docente, setDocente] = useState();
  const [materiaNombre, setMateriaNombre] = useState();
  const [docenteNombre, setDocenteNombre] = useState();
  const [materiaSeleccioanda, setMateriaSeleccioanda] = useState();
  const [selectedFileName, setSelectedFileName] = useState('');

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setSelectedFileName(acceptedFiles[0].name); // Update selected file name
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'uqiqpoca');
    formData.append('api_key', '511399376121436');

    // API call to upload file
    const res = await fetch('https://api.cloudinary.com/v1_1/dcun8q7tb/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    // Save image id to the database
    console.log(data);
    agregarArchivoABDD(user.id, data.public_id, data.original_filename, data.url);
  };

  // Function to add file to the database
  const agregarArchivoABDD = async (idUser, publicId, nombre, url) => {
    try {
      const response = await fetch('https://webapi-fsva.onrender.com/archivo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: idUser,
          publicId: publicId,
          nombre: nombre,
          url: url,
        }),
      });

      const data = await response.json();
      console.log(response);
      console.log(data);
      agregarArchivoATablaUnion(docente, 1, 2, data.idArchivo, materiaSeleccioanda);
    } catch (error) {
      console.error('Error al agregar archivo a la base de datos:', error);
    }
  };

  // Function to add file to union table
  const agregarArchivoATablaUnion = async (idDocente, idCategoria, idEstado, idArchivo, idMateria) => {
    try {
      const response = await fetch('https://webapi-fsva.onrender.com/archivodemateria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idDocente: idDocente,
          idCategoria: idCategoria,
          idEstado: idEstado,
          idArchivo: idArchivo,
          idMateria: idMateria,
        }),
      });

      const data = await response.json();
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error('Error al agregar archivo a la base de datos:', error);
    }
  };

  // Function to query selected material and teacher
  const consultarMateriaYDocente = async (idMateria, idDocente) => {
    try {
      const response = await fetch(`https://webapi-fsva.onrender.com/docente/${idDocente}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Nombre docente : :', data);
      setDocenteNombre(`${data.Nombre} ${data.Ap_Paterno} ${data.Ap_Materno}`);
    } catch (error) {
      console.error('Error al consultar la unión:', error.message);
    }

    // Query material
    try {
      const response = await fetch(`https://webapi-fsva.onrender.com/materia/${idMateria}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('Nombre materia : :', data);
      setMateriaNombre(data.Materia);
    } catch (error) {
      console.error('Error al consultar la unión:', error.message);
    }
  };

  // Query material union
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

  // Use effect to load page
  useEffect(() => {
    const idCarrera = sessionStorage.getItem('idCarrera');
    const idMateria = sessionStorage.getItem('idMateria');
    const idSemestre = sessionStorage.getItem('idSemestre');
    const idDocente = sessionStorage.getItem('idDocente');
    console.log('idCarrera:', idCarrera);
    console.log('idMateria:', idMateria);
    console.log('idSemestre:', idSemestre);
    setCarrera(idCarrera);
    setMateria(idMateria);
    setSemestre(idSemestre);
    setDocente(idDocente);
    // Query union id
    consultarUnion(idCarrera, idSemestre, idMateria);
    // Query material and teacher
    consultarMateriaYDocente(idMateria, idDocente);
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="uploadContainer d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <form onSubmit={handleSubmit} className="row container h-75 d-flex justify-content-around align-items-center border rounded">
          <div
            {...getRootProps()}
            className="contenedorDrag d-flex justify-content-center flex-column align-items-center col-sm-6 h-100"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" className="mt-2" alt="" height={100} width={100} />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>{selectedFileName ? `Selected file: ${selectedFileName}` : 'Choose a file or drag here'}</p>
            )}
            <button className="btn btn-outline-primary mt-2">Subir archivo</button>
            <p className="mt-2">Capacidad máxima: <b>5mb</b> </p>
            <p className="mt-2">Archivos permitidos: <b>.PNG, .JPG, .PDF</b> </p>
          </div>
          <div className="optionsFormContainer mx-2 col-sm-5 d-flex flex-column align-items-left justify-content-around h-100">
            <label htmlFor="">Nombre del archivo</label>
            <input type="text" className="form-control" />
            <label htmlFor="">Categoria</label>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categoria
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Examen</a></li>
                <li><a className="dropdown-item" href="#">Practica</a></li>
                <li><a className="dropdown-item" href="#">Actividad</a></li>
              </ul>
            </div>
            <p>Materia : {typeof materiaNombre === 'string' && materiaNombre !== '' ? (
              <b className="materiaText">{materiaNombre}</b>
            ) : (
              <b>Sin seleccionar</b>
            )}
            </p>
            <p>Docente : {typeof docenteNombre === 'string' && materiaNombre !== '' ? (
              <b className="materiaText">{docenteNombre}</b>
            ) : (
              <b>Sin seleccionar</b>
            )}</p>

            <button className="btn btn-primary">Enviar</button>

          </div>
          {acceptedFiles[0] && (<img src={URL.createObjectURL(acceptedFiles[0])} alt="Uploaded file preview" />)}
        </form>
      </div>
    </div>
  );
};
