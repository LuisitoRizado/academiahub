import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypePng } from "react-icons/bs";
import { AiOutlineFileJpg } from "react-icons/ai";
import { FaRegFileWord } from "react-icons/fa";
import '../styles/componentsStyles/FileComponent.css'
export const FileComponent = ({ archivo }) => {
  // Hooks
  const [fileExtension, setFileExtension] = useState("");

  // Funciones
  function formatearFecha(fecha) {
    const fechaOriginal = new Date(fecha);
    const año = fechaOriginal.getFullYear();
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0");
    const dia = fechaOriginal.getDate().toString().padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  }

  // UseEffect
  useEffect(() => {
    // Al cargar, identificamos qué tipo de archivo es
    const fileName = archivo.url.split("/").pop();
    const extension = fileName.split(".").pop().toLowerCase();
    setFileExtension(extension);
    console.log('Extension: ' + extension);
  }, [archivo.url]);

  // Selección de icono basado en la extensión del archivo
  const getFileIcon = (extension) => {
    switch (extension) {
      case 'pdf':
        return <FaRegFilePdf size={24} />;
      case 'png':
        return <BsFiletypePng size={24} />;
      case 'jpg':
      case 'jpeg':
        return <AiOutlineFileJpg size={24} />;
      case 'doc':
      case 'docx':
        return <FaRegFileWord size={24} />;
      default:
        return (
          <img
            src="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
            alt="file icon"
            width={24}
            height={24}
          />
        );
    }
  };

  return (
    <div
      key={archivo.id}
      className="row d-flex flex-row justify-content-center align-items-center text-center border p-2 archivoContainer mt-2"
    >
      <div className="col-6 row ">
        <div className="col-2 d-flex justify-content-center align-items-center">
          {getFileIcon(fileExtension)}
        </div>
        <a
          href={archivo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="col-8 d-flex justify-content-center align-items-center enlaceLink"
        >
          {archivo.nombre + '.' + fileExtension}
        </a>
      </div>

      
      <p className="col-sm-3 d-flex justify-content-center align-items-center ">
        {archivo.FechaModificacion
          ? formatearFecha(archivo.FechaModificacion)
          : "Sin fecha para mostrar"}
      </p>
      <p className="col-sm-3 d-flex justify-content-center align-items-center ">
        .{fileExtension}
      </p>
    </div>
  );
};
