import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { PublicRoute } from './PublicRoute'
export const AuthRouter = () => {
  return (
    <>
      <Routes>
        {/*Paginas principales */}
        <Route path='/auth/login' element={<PublicRoute>
          <LoginPage />
        </PublicRoute>}></Route>
        <Route path='/auth/signup' element={<PublicRoute>
          <RegisterPage />
        </PublicRoute>}></Route>

        {/*Ruta comodin , en caso de que no se encuentre ninguna. */}
        <Route path='/' element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  )
}
