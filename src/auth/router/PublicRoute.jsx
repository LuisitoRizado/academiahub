//{Children} indica que el componente es un High-level-component
import { useContext } from "react"
import { AuthContext } from "../../auth/context/AuthContext"
import { Navigate } from "react-router-dom"
export const PublicRoute = ({ children }) => {
    //Verificar si el usuario esta verificado o no
    const { logged } = useContext(AuthContext)
    //Comparamos si esta logeado o no
    return (!logged) 
    ? children 
    : <Navigate to='/home' />
}
