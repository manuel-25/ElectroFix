import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext.jsx'

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext)

  if (loading) return <div>Cargando...</div>
  if (!auth) return <Navigate to="/manager" replace />

  return children
}

export default ProtectedRoute
