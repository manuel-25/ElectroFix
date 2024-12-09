import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from '../config.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('authToken')
        if (token) {
            setAuth({ token })
        } else {
            setAuth(null)
        }
        setLoading(false)
    }, [])

    // Función de login
    const login = async (email, password) => {
        try {
            setLoading(true)
            const response = await fetch(`${getApiUrl()}/api/manager/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            })
            
            if (!response.ok) {
                throw new Error('Error en el inicio de sesión')
            }

            const data = await response.json()

            // Almacena el token en la cookie
            Cookies.set('authToken', data.token)
            setAuth({ token: data.token, user: data.user })
            setError(null)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error en el inicio de sesión:', error)
            setError('Error en las credenciales de inicio de sesión')
        } finally {
            setLoading(false)
        }
    }

    // Función de logout
    const logout = async () => {
        try {
            setLoading(true)
            const token = auth?.token

            await axios.post(`${getApiUrl()}/api/manager/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            Cookies.remove('authToken')
            setAuth(null)
            navigate('/manager')
        } catch (err) {
            console.error('Error al cerrar sesión:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ auth, loading, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    )
}
