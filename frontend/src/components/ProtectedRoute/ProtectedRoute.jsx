import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null) // null para manejar el estado de carga
    const token = Cookies.get('authToken')

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    // Verificamos el token haciendo una llamada a la API
                    await axios.get('http://localhost:8000/api/manager/verifytoken', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    setIsAuthenticated(true) // Token válido
                } catch (error) {
                    console.error('Token inválido:', error)
                    setIsAuthenticated(false) // Token no válido
                }
            } else {
                setIsAuthenticated(false) // No hay token
            }
        }

        verifyToken()
    }, [token])

    if (isAuthenticated === null) {
        return <div>Cargando...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/manager" replace />
    }

    return children
}

export default ProtectedRoute
