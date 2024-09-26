// ./components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
  // Verificamos si la cookie 'authToken' existe
  const token = Cookies.get('authToken')

  if (!token) {
    // Si no hay token, redirigir al usuario a la página de login
    return <Navigate to="/manager" replace />
  }

  return children
}

export default ProtectedRoute
