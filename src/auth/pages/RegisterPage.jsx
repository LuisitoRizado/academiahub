import React, { useState } from 'react';
import { BtnRegister } from '../components/BtnRegister';
import { NavLink } from 'react-router-dom';

export const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirmation, setPassConfirmation] = useState('');
    const [response, setResponse] = useState('');
    const [errorShown, setErrorShown] = useState({
        nombre : false,
        correo: false,
        pass: false,
        passConfirmation: false,
    });
    const onHandleName = (e) => {
        const input = e.target.value;
        if (input.length > 50) {
            if (!errorShown.nombre) {
                showError('El nombre debe tener como límite 50 caracteres', 'nombre');
                setErrorShown({ ...errorShown, nombre: true });
            }
            e.target.value = input.substring(0, 50);
            setNombre(input.substring(0, 50));
        } else {
            setErrorShown({ ...errorShown, nombre: false });
            setNombre(input);
        }
    };

    const onHandleCorreo = (e) => {
        const input = e.target.value;
        if (input.length > 50) {
            if (!errorShown.correo) {
                showError('El correo debe tener como límite 50 caracteres', 'correo');
                setErrorShown({ ...errorShown, correo: true });
            }
            e.target.value = input.substring(0, 50);
            setCorreo(input.substring(0, 50));
        } else {
            setErrorShown({ ...errorShown, correo: false });
            setCorreo(input);
        }
    };

    const onHandlePass = (e) => {
        const input = e.target.value;
        if (input.length > 10) {
            if (!errorShown.pass) {
                showError('La contraseña debe tener un límite de 10 caracteres', 'pass');
                setErrorShown({ ...errorShown, pass: true });
            }
            e.target.value = input.substring(0, 10);
            setPass(input.substring(0, 10));
        } else {
            setErrorShown({ ...errorShown, pass: false });
            setPass(input);
        }
    };

    const onHandlePassConfirmation = (e) => {
        const input = e.target.value;
        if (input.length > 10) {
            if (!errorShown.passConfirmation) {
                showError('La contraseña debe tener un límite de 10 caracteres', 'passConfirmation');
                setErrorShown({ ...errorShown, passConfirmation: true });
            }
            e.target.value = input.substring(0, 10);
            setPassConfirmation(input.substring(0, 10));
        } else {
            setErrorShown({ ...errorShown, passConfirmation: false });
            setPassConfirmation(input);
        }
    };

  

    const showError = (message) => {
        const mensajeError = document.createElement('div');
        mensajeError.textContent = message;
        mensajeError.classList.add('alert', 'alert-danger', 'mt-2');
        const contenedor = document.querySelector('.passContainer');
        contenedor.appendChild(mensajeError);
        setTimeout(() => {
            mensajeError.remove();
        }, 5000);
    };

    const onValidateUser = () => {
        // Validate all fields
        if (!nombre || !correo || !pass || !passConfirmation) {
            showError('Por favor, llena todos los campos.');
            return;
        }
 

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
            showError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (pass.length < 8 || !/\d/.test(pass)) {
            showError('La contraseña debe tener al menos 8 caracteres y contener al menos un número.');
            return;
        }

       

        if (pass !== passConfirmation) {
            showError('Las contraseñas deben ser iguales.');
            return;
        }

        // If all validations pass, display success message or perform other actions
        const mensajeExito = document.createElement('div');
        mensajeExito.textContent = 'Registro exitoso.';
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
                                            <form className="mx-1 mx-md-4" onSubmit={(e) => e.preventDefault()}>
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
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0 passContainer">
                                                        <label className="form-label" htmlFor="passConfirmation">Confirma tu contraseña</label>
                                                        <input type="password" id="passConfirmation" className="form-control" onChange={onHandlePassConfirmation} />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 bg">
                                                    <button type="button" className="btn btn-secondary mx-4" onClick={() => window.location.href='/auth/login'}>Regresar</button>
                                                    <BtnRegister name={nombre} user={correo} pass={pass} onRespuestaRegistro={onValidateUser}>Registrar</BtnRegister>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://www.appsflyer.com/wp-content/themes/AF2020/assets/images/placeholders/signup/img-thanks.svg" className="img-fluid" alt="Sample image" />
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
