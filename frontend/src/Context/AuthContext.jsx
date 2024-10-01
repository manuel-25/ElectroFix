import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('authToken')
        console.log('Auth token: ', token)
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
            const response = await fetch('https://electrosafeweb.com/api/manager/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            })
            console.log('response', response)
            if (!response.ok) {
                throw new Error('Error en el inicio de sesión', response)
            }

            const data = await response.json()
            
            // Almacena el token en la cookie
            Cookies.set('authToken', data.token)
            setAuth({ token: data.token, user: data.user })
            navigate('/dashboard')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Función de logout
    const logout = async () => {
        try {
            const token = auth?.token

            await axios.post('https://electrosafeweb.com/api/manager/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            Cookies.remove('authToken')
            setAuth(null) // Asegúrate de que auth sea null al cerrar sesión
            navigate('/manager')
        } catch (err) {
            console.error('Error al cerrar sesión:', err)
        }
    }

    return (
        <AuthContext.Provider value={{ auth, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
