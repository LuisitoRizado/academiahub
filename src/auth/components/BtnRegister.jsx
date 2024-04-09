import React from 'react'

//Recibe 2 parametros, el usuario y la contrasena

export const BtnRegister = ({ name, user, pass, onRespuestaRegistro }) => {
    //Hooks

    //Funciones
    //--Funcion para registrarse
    const onRegister = async (name, user, pass) => {
        try {
            // Logica para el registro del usuario
            const response = await fetch('http://localhost:3000/registrarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idRol: 3, // Indica que es un usuario normal
                    nombre: name,
                    correo: user,
                    pass: pass,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const responseData = await response.json();
            // Aquí puedes acceder a la información adicional devuelta en el cuerpo de la respuesta
            console.log('Respuesta exitosa:', responseData);
            onRespuestaRegistro(responseData);

            return responseData; // Puedes devolver esta información si es necesario
        } catch (error) {
            console.error('Error durante el registro del usuario:', error.message);
            // Aquí puedes manejar errores de red u otros problemas en la solicitud
            onRespuestaRegistro(error.message);

        }
    };

    //
    return (
        <button className='btn btn-primary loginButton' onClick={() => onRegister(name, user, pass)} >
            Registrarse
        </button>
    )
}
