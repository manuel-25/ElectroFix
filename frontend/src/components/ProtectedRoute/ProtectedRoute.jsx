import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx'

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  }

  if (!auth) {
    return <Navigate to="/manager" replace />
  }

  return children
}

export default ProtectedRoute
