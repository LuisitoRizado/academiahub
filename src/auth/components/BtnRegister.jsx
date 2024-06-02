import React from "react";

//Recibe 2 parametros, el usuario y la contrasena

export const BtnRegister = ({ name, user, pass, onRespuestaRegistro }) => {
  //Hooks

  //Funciones
  //--Funcion para registrarse
  const onRegister = async (name, user, pass) => {
    const btnRegister = document.querySelector('.registerButton');
    btnRegister.disabled = true;

    try {
      // Logica para el registro del usuario
      const response = await fetch("https://webapi-fsva.onrender.com/registrarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idRol: 3, // Indica que es un usuario normal
          nombre: name,
          correo: user,
          pass: pass,
        }),
      });

      if (response.status == 400) {
        // If all validations pass, display success message and redirect after 5 seconds
        const mensajeExito = document.createElement("div");
        mensajeExito.textContent = "Correo electronico en uso, intenta con otro.";
        mensajeExito.classList.add("alert", "alert-warning", "mt-2");
        const contenedor = document.querySelector(".passContainer");
        contenedor.appendChild(mensajeExito);
        setTimeout(() => {
          mensajeExito.remove();
          //Bloqueamos el boton 3 segundos
          btnRegister.disabled = false;

          // Redirect to the previous page
        }, 5000);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      } else if (response.status == 401) {
        /*Mostrar mensaje que  ya existe una cuenta con ese correo. */
        // If all validations pass, display success message and redirect after 5 seconds
        const mensajeExito = document.createElement("div");
        mensajeExito.textContent = "Usuario ya existente";
        mensajeExito.classList.add("alert", "alert-success", "mt-2");
        const contenedor = document.querySelector(".passContainer");
        contenedor.appendChild(mensajeExito);
        setTimeout(() => {
          mensajeExito.remove();
          btnRegister.disabled = false;
          // Redirect to the previous page
        }, 5000);
      } else {
        // If all validations pass, display success message and redirect after 5 seconds
        const mensajeExito = document.createElement("div");
        mensajeExito.textContent =
          "Usuario creado con éxito. Ahora puedes iniciar sesión.";
        mensajeExito.classList.add("alert", "alert-success", "mt-2");
        const contenedor = document.querySelector(".passContainer");
        contenedor.appendChild(mensajeExito);
        setTimeout(() => {
          mensajeExito.remove();
          // Redirect to the previous page
          btnRegister.disabled = false;

        }, 5000);
      }
      const responseData = await response.json();
      // Aquí puedes acceder a la información adicional devuelta en el cuerpo de la respuesta
      console.log("Respuesta exitosa:", responseData);
      onRespuestaRegistro(responseData);

      return responseData; // Puedes devolver esta información si es necesario
    } catch (error) {
      console.error("Error durante el registro del usuario:", error.message);
      // Aquí puedes manejar errores de red u otros problemas en la solicitud
      onRespuestaRegistro(error.message);
    }
  };

  //
  return (
    <button
      className="btn btn-primary loginButton registerButton"
      onClick={() => onRegister(name, user, pass)}
    >
      Registrarse
    </button>
  );
};
