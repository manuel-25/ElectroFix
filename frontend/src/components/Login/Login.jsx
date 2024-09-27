import './Login.css'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://localhost:8000/api/manager/login', { email, password })
            // Guardar el token en una cookie
            Cookies.set('authToken', response.data.token, {
                expires: 1,
                //secure: true,   // Solo se envía a través de HTTPS
            })

            // Redirigir al usuario al Dashboard
            navigate('/dashboard')
        } catch (err) {
            console.error('Login error:', err)
            setError('Credenciales invalidas')
        } finally {
            setLoading(false)
        }    
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required 
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    )
}

export default Login
