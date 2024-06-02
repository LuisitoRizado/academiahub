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
    // Deshabilitamos el botón
    const loginButton = document.querySelector('.loginButton')
    loginButton.disabled = true;
    
    // Obtener el valor del correo electrónico y la contraseña
    const username = document.getElementById('correoInput').value;
    const pass = document.getElementById('passInput').value;

    // Validar que las cajas de texto tengan valores
    if (username !== "" && pass !== "") {
        // Validar formato de correo electrónico
        if (!isValidEmail(username)) {
            const mensajeError = document.createElement('div');
            mensajeError.textContent = 'Por favor, ingresa un correo electrónico válido.';
            mensajeError.classList.add('alert', 'alert-danger', 'mt-2');
            const contenedor = document.querySelector('.passContainer');
            contenedor.appendChild(mensajeError);
            setTimeout(() => {
                mensajeError.remove();
                loginButton.disabled = false;
            }, 3000);
            return;
        }

        try {
            const response = await fetch(`https://webapi-fsva.onrender.com/login/${username}/${pass}`);
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
                const mensajeError = document.createElement('div');
                mensajeError.textContent = 'Correo o contraseña incorrectos.';
                mensajeError.classList.add('alert', 'alert-danger', 'mt-2');
                const contenedor = document.querySelector('.passContainer');
                contenedor.appendChild(mensajeError);
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
      const mensajeError = document.createElement('div');
      mensajeError.textContent = 'Por favor, ingresa los datos.';
      mensajeError.classList.add('alert', 'alert-danger', 'mt-2');
      const contenedor = document.querySelector('.passContainer');
      contenedor.appendChild(mensajeError);
      setTimeout(() => {
          mensajeError.remove();
          loginButton.disabled = false;
      }, 3000);
    }
};

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
    // Utilizamos una expresión regular para validar el formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


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
                src="https://coecytcoahuila.gob.mx/wp-content/uploads/2022/11/ITS-1.png"
                className=" w-75 h-75"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h4>Inicio de sesion</h4>
              <br />
              <br />
              <form>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Correo electronico
                  </label>
                  <br />
                  <input
                    type="email"
                    id="correoInput"
                    className="form-control form-control-lg"
                    placeholder="Introduce una direccion de correo"
                    onChange={(e) => onHandleUser(e)}
                  />
                  <br />

                </div>

                <div className="form-outline mb-3 passContainer">
                  <label className="form-label" htmlFor="form3Example4">
                    Contrasena
                  </label>
                  <br />
                  <input
                    type="password"
                    id="passInput"
                    className="form-control form-control-lg"
                    placeholder="Introduce tu contrasena"
                    onChange={(e) => onHandlePass(e)}
                  />
                  <br />

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
                  <br />
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
