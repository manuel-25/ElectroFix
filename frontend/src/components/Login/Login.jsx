import './Login.css'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext.jsx'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await login(email, password)
        } catch (err) {
            console.error('Error de inicio de sesión:', err)
            setError('Credenciales inválidas')
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
