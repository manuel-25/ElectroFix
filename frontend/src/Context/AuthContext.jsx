import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const logout = () => {
    setAuth(null)
    Cookies.remove('authToken')
  }

  useEffect(() => {
    const isPrivateRoute = [
      '/dashboard',
      '/cotizaciones',
      '/clientes',
      '/servicios',
      '/perfil'
    ].some((path) => location.pathname.startsWith(path))

    if (!isPrivateRoute) {
      setLoading(false)
      return
    }

    const verifyToken = async () => {
      const token = Cookies.get('authToken')
      if (!token) {
        setAuth(null)
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/manager/verifytoken`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })

        if (response.status === 200 && response.data?.user) {
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
  }, [location.pathname])

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
