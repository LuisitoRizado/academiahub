import React, { useState } from 'react';
import { BtnRegister } from '../components/BtnRegister';
import { NavLink } from 'react-router-dom';

export const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirmation, setPassConfirmation] = useState('');
    const [response, setResponse] = useState('');

    const onHandleName = (e) => {
        setNombre(e.target.value);
    };
    const onHandleCorreo = (e) => {
        setCorreo(e.target.value);
    };
    const onHandlePass = (e) => {
        setPass(e.target.value);
    };
    const onHandlePassConfirmation = (e) => {
        setPassConfirmation(e.target.value);
    };

    const onValidateUser = () => {
        // Validate all fields
        if (!nombre || !correo || !pass || !passConfirmation) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        // Validate password match
        if (pass !== passConfirmation) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // If all validations pass, display success message
        const mensajeExito = document.createElement('div');
        mensajeExito.textContent = 'Usuario creado con éxito. Ahora puedes iniciar sesión.';
        mensajeExito.classList.add('alert', 'alert-success', 'mt-2');
        const contenedor = document.querySelector('.passContainer');
        contenedor.appendChild(mensajeExito);
        setTimeout(() => {
            mensajeExito.remove();
        }, 5000);
    };

    return (
        <div>
            <section className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Crear cuenta</p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="nombre">Nombre</label>
                                                        <input type="text" id="nombre" className="form-control" onChange={onHandleName} />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="correo">Correo electrónico</label>
                                                        <input type="email" id="correo" className="form-control" onChange={onHandleCorreo} />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="pass">Contraseña</label>
                                                        <input type="password" id="pass" className="form-control" onChange={onHandlePass} />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4 ">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0 passContainer">
                                                        <label className="form-label" htmlFor="passConfirmation">Confirma tu contraseña</label>
                                                        <input type="password" id="passConfirmation" className="form-control" onChange={onHandlePassConfirmation} />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 bg">
                                                    <button type="button" className="btn btn-secondary mx-4" onClick={() => window.location.href='/auth/login'}>Cancelar</button>
                                                    <BtnRegister name={nombre} user={correo} pass={pass} onRespuestaRegistro={onValidateUser}>Registrar</BtnRegister>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
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
