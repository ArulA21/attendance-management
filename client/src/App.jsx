import React from 'react'
import { Login } from './components/Login'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/userContext'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'

export const App = () => {
  const {authUser} = useContext(AuthContext);

  return (
    <>
      <Toaster />
      <Routes>
        <Route 
          path='/login'
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route 
          path='/'
          element={authUser ?  <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}
