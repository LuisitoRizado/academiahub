//{Children} indica que el componente es un High-level-component
import { useContext } from "react"
import { AuthContext } from "../../auth/context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"
export const PrivateRoute = ({ children }) => {
    //Verificar si el usuario esta verificado o no
    const { logged } = useContext(AuthContext)
    const { pathname, search } = useLocation()
    const lastPath = pathname;
    sessionStorage.setItem('lastpath', lastPath)
    console.log('Redibujado')
    //Comparamos si esta logeado o no

    return (logged)
        ? children
        : <Navigate to='/auth/login' />
}
