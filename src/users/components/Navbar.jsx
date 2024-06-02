import { useContext } from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {
    //Acceso al context
    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const onLogout = () => {
        //Limpiamos el context
        //Cerramos sesion
        logout()
        //Salimos del login
        navigate('/auth/login', {
          replace : true
        })
      }


    //Extrayemos el usuario del authcontext
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-3">
            <Link
                className="navbar-brand"
                to="/"
            >
                <img src="https://saltillo.tecnm.mx/tecnologico/logotec.png" height={35} width={35} alt="" className='mx-2'/>
                AcademiaHub
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className="nav-item nav-link"
                        to="/home"
                    >
                        Inicio
                    </NavLink>
                    {
                        /*
                        <NavLink
                        className="nav-item nav-link"
                        to="/myFiles"
                    >
                        Contenido
                    </NavLink>
                        */
                    }
                    

                    <NavLink
                        className="nav-item nav-link"
                        to="/about"
                    >
                        About
                    </NavLink>


                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <NavLink
                        className="nav-item nav-link"
                        to="/auth/login"
                        onClick={onLogout}
                    >
                        Cerrar sesion
                    </NavLink>
                    <NavLink
                        className='nav-tem nav-link'
                        to='profile'
                    >
                        {
                            user ? (<div></div>) : (<div></div>)
                        }
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
}
