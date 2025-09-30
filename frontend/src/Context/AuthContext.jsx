import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { getApiUrl } from '../config.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* === Verificación automática de token === */
  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('authToken')
      if (!token) {
        setAuth(null)
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${getApiUrl()}/api/manager/verifytoken`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        })

        if (response.status === 200) {
          setAuth({ token, user: response.data.user })
        } else {
          setAuth(null)
        }
      } catch (err) {
        console.error('Token inválido o expirado', err)
        setAuth(null)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  /* === Login === */
  const login = async (email, password, remember = true) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${getApiUrl()}/api/manager/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // mantiene la sesión si usás cookies en backend
      })

      if (!response.ok) {
        setError('Credenciales inválidas o error de conexión')
        return false
      }

      const data = await response.json()

      // ⚠️ IMPORTANTE: secure solo en producción
      Cookies.set('authToken', data.token, {
        expires: remember ? 7 : undefined,
        secure: process.env.NODE_ENV === 'production'
      })

      setAuth({ token: data.token, user: data.user })
      setError(null)
      return true
    } catch (err) {
      console.error('Error en login:', err)
      setError('Credenciales inválidas o error de conexión')
      return false
    } finally {
      setLoading(false)
    }
  }

  /* === Logout === */
  const logout = async () => {
    setLoading(true)
    try {
      await axios.post(
        `${getApiUrl()}/api/manager/logout`,
        {},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      )
    } catch (err) {
      console.warn('Error en logout:', err)
    }
    Cookies.remove('authToken')
    setAuth(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
