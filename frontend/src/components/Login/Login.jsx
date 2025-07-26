import './Login.css'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext.jsx'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(true)
    const { login, loading, error } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(email, password, remember)
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin} autoComplete="on">
                <h2>Iniciar Sesión</h2>
                <div className="input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
                        autoComplete="username"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="input-group password-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Contraseña'
                        autoComplete="current-password"
                        required
                        disabled={loading}
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(v => !v)}
                        tabIndex={0}
                        aria-label="Mostrar/ocultar contraseña"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="login-options">
                    <label className="remember-label">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(v => !v)}
                            disabled={loading}
                        />
                        Mantener sesión iniciada (7 días)
                    </label>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    )
}

export default Login
