import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  // Verificación inicial del token desde backend (cookie)
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${getApiUrl()}/api/manager/verifytoken`, { withCredentials: true })
        if (response.status === 200) {
          setAuth({ user: response.data.user })
          setAuthenticated(true)    
        } else {
          setAuth(null)
        }
      } catch (err) {
        setAuth(null)
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    verifyToken()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${getApiUrl()}/api/manager/verifytoken`, { withCredentials: true })
        .then(res => setAuthenticated(true))
        .catch(() => {
          setAuthenticated(false)
          setAuth(null)
        })
    }, 60 * 1000) // cada 60 segundos

    return () => clearInterval(interval)
  }, [])

  // Login: no manejás token desde JS, confías en cookie
  const login = async (email, password, remember = true) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${getApiUrl()}/api/manager/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
        credentials: 'include'
      })
      if (!response.ok) {
        setError('Credenciales inválidas o error de conexión')
        return false
      }
      const data = await response.json()
      setAuth({ user: data.user })
      setAuthenticated(true) // 🔥 Este era el que faltaba
      return true
    } catch (err) {
      console.error('Error en login:', err)
      setError('Credenciales inválidas o error de conexión')
      return false
    } finally {
      setLoading(false)
    }
  }


  // Logout: pedir al backend borrar cookie
  const logout = async () => {
    setLoading(true)
    try {
      await axios.post(`${getApiUrl()}/api/manager/logout`, {}, {
        withCredentials: true
      })
    } catch (err) {
      console.warn('Error en logout:', err)
    }
    setAuth(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading, error, authenticated }}>
      {children}
  </AuthContext.Provider>
  )
}
