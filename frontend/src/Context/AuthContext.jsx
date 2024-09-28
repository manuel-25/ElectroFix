import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            setAuth({ token }); // Establecer el estado de autenticación si hay un token
        }
    }, [])

    // Función de login
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/manager/login', { email, password })
            const token = response.data.token

            // Guardar el token en la cookie
            Cookies.set('authToken', token, { expires: 1 })

            // Actualizar el estado de autenticación
            setAuth({ token })
            navigate('/dashboard') // Redirigir al dashboard después del login
        } catch (err) {
            console.error('Error de inicio de sesión:', err)
            throw new Error('Credenciales inválidas')
        }
    }

    // Función de logout
    const logout = async () => {
        try {
            // Asegúrate de que el token esté disponible en el estado de autenticación
            const token = auth?.token

            // Realiza la solicitud de logout con el token en la cabecera
            await axios.post('http://localhost:8000/api/manager/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token aquí
                },
            })

            // Eliminar el token de la cookie
            Cookies.remove('authToken')

            // Limpiar el estado de autenticación
            setAuth(null)
            navigate('/manager') // Redirigir a la página de login o manager
        } catch (err) {
            console.error('Error al cerrar sesión:', err)
        }
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
