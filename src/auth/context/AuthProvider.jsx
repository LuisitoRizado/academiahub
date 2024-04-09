//El auth provider utiliza el auth context,
//Provee la informacion a toda la aplicacion

import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer.js'
import { types } from '../types/types.js'
//Nuestro reducer
/*const initialState = {
    logged: false,

}*/
//Inicializar el estado
//Cuando se carga la web, manda a llamar esta funcion de inicializacion
const init = () =>{
    //Detecta que tenemos el usuario en el local storage, cuando tenga el back, 
    //aqui tal vez seria un token o algo asi?
    const user= JSON.parse(sessionStorage.getItem('user'))

    return{
        logged: !!user,
        user:user,
    }
}
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init)
    //Funcion para logeo
    //NOTA : Aqui puede ir la llamada al backend para obtener el usuario de la bdd
    const login = (idUser, idRol) => {
        const user = {
            id:idUser, 
            rol:idRol 
        }
        //El login lo que termina haciendo es un dispatch de la accion
        const action = {
            
            type: types.login,
            //Payload, que es lo que vas a hacer?, almacenar
            payload : {
                //Se manda al reducer
                user,
               
                
            }
        }
        //Guardar en el sessionStorage
        sessionStorage.setItem('user', JSON.stringify(user))
        //Dispatch, llamamos a la action.
        dispatch(action);
    }

    //Funcion de logout
    const logout = () =>{
        //Usuario vacio para mandar
        
        //Eliminamos el user del sessionStorage
        sessionStorage.removeItem('user');
        const action = {
            type:types.logout,
            
        }
        dispatch(action);
    }
    return (
        <AuthContext.Provider value={{
            //Atributos
            ...authState,
            //Methods
            //Mandamos el login
            login : login,
            //Mandamos el logout
            logout : logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
