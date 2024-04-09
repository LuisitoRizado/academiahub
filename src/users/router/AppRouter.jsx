import React from 'react'
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../../auth/pages/LoginPage'
import { Navbar } from '../components'
import { AboutPage } from '../pages/AboutPage'
import { MateriasPage } from '../pages/MateriasPage'
import { DocentesPage } from '../pages/DocentesPage'
import { ContenidoPage } from '../pages/ContenidoPage'
import { UploadArchivoPage } from '../pages/UploadArchivoPage'
import { PrivateRoute } from './PrivateRoute'
import { MyFilesPages } from '../pages/MyFilesPages'

export const AppRouter = () => {
  //Buscamos si esta loggeado o no
  return (
    <>

      <Routes>
        {/*Paginas principales */}
        <Route path='home' element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }></Route>
        <Route path='about' element={<PrivateRoute>
          <AboutPage />
        </PrivateRoute>}>

        </Route>
        <Route path='myFiles' element={<PrivateRoute>
          <MyFilesPages />
        </PrivateRoute>}>

        </Route>
        {/*Paginas con 2 */}
        <Route path='home/materias' element={<PrivateRoute>
          <MateriasPage />
        </PrivateRoute>}></Route>
        {/*Paginas con 3 */}
        <Route path='home/materias/docentes' element={<PrivateRoute>
          <DocentesPage />
        </PrivateRoute>}></Route>
        {/*Paginas con 4 */}

        <Route path='home/materias/docentes/contenido' element={<PrivateRoute>
          <ContenidoPage />
        </PrivateRoute>}></Route>
        <Route path='home/materias/docentes/contenido/upload' element={<PrivateRoute>
          <UploadArchivoPage />
        </PrivateRoute>}></Route>


        {/*Ruta comodin , en caso de que no se encuentre ninguna. */}
        <Route path='/' element={<Navigate to="/auth/login" />} />
      </Routes>

    </>
  )
}
