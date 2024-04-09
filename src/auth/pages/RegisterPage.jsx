import React from 'react';
import { useState } from 'react';
//Pagina del componente del registro de usuario
import { BtnRegister } from '../components/BtnRegister';
import { NavLink } from 'react-router-dom';
export const RegisterPage = () => {

    //Hooks
    const [nombre, setNombre] = useState()
    const [correo, setCorreo] = useState()
    const [pass, setPass] = useState()
    const [passConfirmation, setPassConfirmation] = useState()
    const [response, setResponse] = useState()
    //Funciones
    const onHandleName = (e) => {
        setNombre(e.target.value)
    }
    const onHandleCorreo = (e) => {
        setCorreo(e.target.value)
    }
    const onHandlePass = (e) => {
        setPass(e.target.value)
    }
    const onHandlePassConfirmation = (e) => {
        setPassConfirmation(e.target.value)
    }

    const onValidateUser = (res) => {
        //Deshabilitamos el boton
    const loginButton = document.querySelector('.loginButton')
    loginButton.disabled = true;
        //Validamos que el usuario fue creado con exito!
        setResponse(res);
        //Dependiendo del mensaje, mostramos el error
        if(isNaN(res)){
            //Caso de error
            //Creamos un componente de alerta
            const mensajeError = document.createElement('div');
            mensajeError.textContent = 'El correo introducido ya tienen una cuenta.';
            mensajeError.classList.add('alert', 'alert-danger', 'mt-2');

            // Ubicamos el contenedor
            const contenedor = document.querySelector('.passContainer');

            // Agregamos al contenedor
            contenedor.appendChild(mensajeError);

            // Eliminar el mensaje después de 2 segundos
            setTimeout(() => {
                mensajeError.remove();
                loginButton.disabled = false;
            }, 5000);
        }
        else{
            //Caso de aceptacion
            const mensajeError = document.createElement('div');
            mensajeError.textContent = 'Usuario creado con exito, ya puedes iniciar sesion';
            mensajeError.classList.add('alert', 'alert-success', 'mt-2');

            // Ubicamos el contenedor
            const contenedor = document.querySelector('.passContainer');

            // Agregamos al contenedor
            contenedor.appendChild(mensajeError);

            // Eliminar el mensaje después de 2 segundos
            setTimeout(() => {
                mensajeError.remove();
                loginButton.disabled = false;
            }, 5000);

        }
    }
    //Validamos que las contrasenas en las cajas de texto coincidan
    const validateTwoPasswords = () => {
        if(pass == passConfirmation){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <div>
            <section className="vh-100"  >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Crear cuenta</p>

                                            <form className="mx-1 mx-md-4" onSubmit={(e) => e.preventDefault()}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">Nombre</label>
                                                        <input type="text" id="form3Example1c" className="form-control" onChange={(e) => onHandleName(e)} />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example3c">Correo electronico</label>
                                                        <input type="email" id="form3Example3c" className="form-control" onChange={(e) => onHandleCorreo(e)}/>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example4c">Contrasena</label>
                                                        <input type="password" id="form3Example4c" className="form-control" onChange={(e) => onHandlePass(e)}/>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4 ">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0 passContainer">
                                                        <label className="form-label" htmlFor="form3Example4cd">Confirma tu contrasena</label>

                                                        <input type="password" id="form3Example4cd" className="form-control" onChange={(e) => onHandlePassConfirmation(e)} />
                                                    </div>
                                                </div>

                                                <div className="d-flex  justify-content-center mx-4 mb-3 mb-lg-4 bg ">
                                                    <NavLink to={'/auth/login'} className='btn btn-secondary mx-4'>Cancelar </NavLink>
                                                    <BtnRegister name={nombre} user={correo} pass={pass} onRespuestaRegistro={onValidateUser} >      
                                                    </BtnRegister>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
