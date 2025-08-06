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

    // Login con remember
    const login = async (email, password, remember = true) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${getApiUrl()}/api/manager/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })
            if (!response.ok) {
                setError('Credenciales inválidas o error de conexión')
                return false // <--- para que el frontend sepa que falló
            }
            const data = await response.json()
            Cookies.set('authToken', data.token, { expires: remember ? 7 : undefined, secure: true })
            setAuth({ token: data.token, user: data.user })
            setError(null)
            navigate('/dashboard')
            return true // <--- éxito
        } catch (err) {
            setError('Credenciales inválidas o error de conexión')
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            await axios.post(`${getApiUrl()}/api/manager/logout`, {}, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            })
        } catch {}
        Cookies.remove('authToken')
        setAuth(null)
        setLoading(false)
        navigate('/manager')
    }

    return (
        <AuthContext.Provider value={{ auth, loading, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    )
}
