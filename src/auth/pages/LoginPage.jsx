import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
export const LoginPage = () => {

  //Acceso al context
  const { login, logout } = useContext(AuthContext)
  const [username, setUsername] = useState()
  const [pass, setPass] = useState()
  //Hook para el perfil completo del usuario
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const onLogin = async () => {
    const lastpath = sessionStorage.getItem('lastpath') || '/home';
    //Deshabilitamos el boton
    const loginButton = document.querySelector('.loginButton')
    loginButton.disabled = true;
    // Validar que las cajas de texto tengan valores
    if (username !== "" && username !== undefined && pass !== "" && pass !== undefined) {
        try {
            const response = await fetch(`http://localhost:3000/login/${username}/${pass}`);
            const data = await response.json();

            console.log('NUEVA DATA : ', data);

            if (data !== undefined && !data.message) {
                // En caso de que se encuentre el usuario
                login(data.idUser, data.idRol);
                navigate(lastpath, {
                    replace: true
                });
            } else {
                // En caso de que no se encuentre el usuario
                // Puedes manejar el caso de usuario no encontrado aquí
                // Mostramos un mensaje
                // CHATGTP, aquí creas un elemento de mensaje de error 
                const mensajeError = document.createElement('div');
                mensajeError.textContent = 'Correo o contraseña no válidos';
                mensajeError.classList.add('alert', 'alert-danger', 'mt-2');

                // Ubicamos el contenedor
                const contenedor = document.querySelector('.passContainer');

                // Agregamos al contenedor
                contenedor.appendChild(mensajeError);

                // Eliminar el mensaje después de 2 segundos
                setTimeout(() => {
                    mensajeError.remove();
                    loginButton.disabled = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            // Puedes manejar el error de la solicitud aquí
        }
    } else {
        alert('Ingresa los datos, por favor.');
    }
};


  const onHandleUser = (e) => {
    setUsername(e.target.value)
  }

  const onHandlePass = (e) => {
    setPass(e.target.value)

  }
  const onLogout = () => {
    //Limpiamos el context
    logout()

    navigate('/auth/login', {
      replace: true
    })
  }
  //Funcion del hook de auth0, redirecciona una vez logeado el usuario
  const { loginWithRedirect } = useAuth0()
  return (
    <div className='mainContainer'>
      <section className="vh-100 d-flex justify-content-center align-items-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    id="correoInput"
                    className="form-control form-control-lg"
                    placeholder="Introduce una direccion de correo"
                    onChange={(e) => onHandleUser(e)}
                  />

                </div>

                <div className="form-outline mb-3 passContainer">
                  <label className="form-label" htmlFor="form3Example4">
                    Contrasena
                  </label>
                  <input
                    type="password"
                    id="passInput"
                    className="form-control form-control-lg"
                    placeholder="Introduce tu contrasena"
                    onChange={(e) => onHandlePass(e)}
                  />

                </div>

                <div className="d-flex justify-content-between align-items-center">
                  { /*<div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  */}
                  <a href="#!" className="text-body">
                    Olvidaste tu contrasena ?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={onLogin}
                    type="button"
                    className="btn btn-primary btn-lg loginButton"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    No tienes una cuenta? <NavLink to='/auth/signup' > Registrate</NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};
