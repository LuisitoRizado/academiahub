import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "../components";
import "../styles/componentsStyles/ContenidoPage.css";
import { MdOutlineSearch } from "react-icons/md";
import { FileComponent } from "../components/FileComponent";

export const ContenidoPage = () => {
  const [archivosMateria, setArchivosMateria] = useState([]);
  const [materia, setMateria] = useState();
  const [carrera, setCarrera] = useState();
  const [semestre, setSemestre] = useState();
  const [docente, setDocente] = useState();
  const [materiaSeleccioanda, setMateriaSeleccioanda] = useState();
  const [materiaNombre, setMateriaNombre] = useState();
  const [docenteNombre, setDocenteNombre] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  function formatearFecha(fecha) {
    const fechaOriginal = new Date(fecha);
    const año = fechaOriginal.getFullYear();
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0");
    const dia = fechaOriginal.getDate().toString().padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  }

  const consultarMateriaYDocente = async (idMateria, idDocente) => {
    try {
      const response = await fetch(
        `https://webapi-fsva.onrender.com/docente/${idDocente}`
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Nombre docente : :", data);
      setDocenteNombre(`${data.Nombre} ${data.Ap_Paterno} ${data.Ap_Materno}`);
    } catch (error) {
      console.error("Error al consultar la unión:", error.message);
    }

    try {
      const response = await fetch(
        `https://webapi-fsva.onrender.com/materia/${idMateria}`
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Nombre materia : :", data);
      setMateriaNombre(data.Materia);
    } catch (error) {
      console.error("Error al consultar la unión:", error.message);
    }
  };

  const consultarUnion = async (idCarrera, idSemestre, idMateria) => {
    try {
      const response = await fetch(
        `https://webapi-fsva.onrender.com/materiaSeleccionada/${idCarrera}/${idSemestre}/${idMateria}`
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Datos de la unión:", data);
      setMateriaSeleccioanda(data.idUnion);
    } catch (error) {
      console.error("Error al consultar la unión:", error.message);
    }
  };

  const cargarTodosLosArchivos = async () => {
    try {
      const response = await fetch(
        `https://webapi-fsva.onrender.com/archivosdemateria/${materiaSeleccioanda}/${docente}`
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Archivos de la materia: ", data);
      setArchivosMateria(data);
    } catch (error) {
      console.error("Error al cargar los archivos:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const idCarrera = sessionStorage.getItem("idCarrera");
      const idMateria = sessionStorage.getItem("idMateria");
      const idSemestre = sessionStorage.getItem("idSemestre");
      const idDocente = sessionStorage.getItem("idDocente");
      console.log("idCarrera:", idCarrera);
      console.log("idMateria:", idMateria);
      console.log("idSemestre:", idSemestre);

      setCarrera(idCarrera);
      setMateria(idMateria);
      setSemestre(idSemestre);
      setDocente(idDocente);
      await consultarUnion(idCarrera, idSemestre, idMateria);
      cargarTodosLosArchivos();
      consultarMateriaYDocente(idMateria, idDocente);
    };

    fetchData();
  }, [materiaSeleccioanda]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArchivos = archivosMateria.filter((archivo) =>
    archivo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h6 className="mx-5 mt-4">Materia: <span className="text-secondary"> {materiaNombre} </span></h6> 
      <h6 className="mx-5 mt-4">Docente: <span className="text-secondary"> {docenteNombre} </span></h6> 

      <div className="header row d-flex justify-content-center align-items-center mt-4">
        <div className="col-md-5 contendorSearchBar">
          <MdOutlineSearch className="searchIcon" />
          <input
            type="text"
            className="inputBuscarArchivo form-control"
            placeholder="Buscar archivo"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="dropdown col-md-2">
          <button
            className="btn btn-secondary dropdown-toggle invisible"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Categoria
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
        <div className="dropdown col-sm-2">
          <a
            className="btn btn-secondary dropdown-toggle invisible"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Ordenar por
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a className="dropdown-item" href="#">
                Fecha
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Nombre
              </a>
            </li>
          </ul>
        </div>
        <NavLink
          className="btn btn-primary border border-primary col-sm-2 m-2 d-flex justify-content-center align-items-center flex-column"
          to={"upload"}
        >
          Subir archivo +
        </NavLink>
      </div>

      <br />
      <br />
      <br />
      <div className="tablaArchivos rounded border mx-5">
        <div className="tableHeader row d-flex flex-row justify-content-center align-items-center text-center p-2">
          <h5 className="col-sm-6">Archivo</h5>
          <h5 className="col-sm-3">Fecha subida</h5>
          <h5 className="col-sm-3">Tipo</h5>
        </div>
        <div className="mx-4">
          {filteredArchivos.length > 0 ? (
            filteredArchivos.map((archivo) => (
              <FileComponent key={archivo.id} archivo={archivo} />
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column mt-2">
              <img
                src="https://cdn4.iconfinder.com/data/icons/computer-emoticons/512/Sad-Emoji-Emotion-Face-Expression-Feeling_1-512.png"
                alt=""
                className="notFoundImage"
              />
              <h4 className="text-center text-primary">¡OOPS!</h4>
              <h4 className="text-center text-primary">
                Parece que aún nadie ha subido contenido para esta materia. ¡Sé
                el primero!
              </h4>
              <NavLink
                className="btn btn-primary border border-primary col-sm-2 m-2 d-flex justify-content-center align-items-center flex-column"
                to={"upload"}
              >
                Subir archivo +
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};