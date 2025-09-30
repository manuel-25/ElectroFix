import './Login.css'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext.jsx'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const MAX_ATTEMPTS = 5
const LOCK_TIME = 180 // segundos (3 minutos)

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(true)
    const [attempts, setAttempts] = useState(0)
    const [lockUntil, setLockUntil] = useState(null)
    const { login, loading, error } = useContext(AuthContext)

    // Timer para lockout
    React.useEffect(() => {
        if (!lockUntil) return
        const interval = setInterval(() => {
            if (Date.now() > lockUntil) setLockUntil(null)
        }, 1000)
        return () => clearInterval(interval)
    }, [lockUntil])

    const handleLogin = async (e) => {
        e.preventDefault()
        if (lockUntil && Date.now() < lockUntil) return
        const success = await login(email, password, remember)
        if (!success) {
            if (attempts + 1 >= MAX_ATTEMPTS) {
                setLockUntil(Date.now() + LOCK_TIME * 1000)
                setAttempts(0)
            } else {
                setAttempts(a => a + 1)
            }
        } else {
            setAttempts(0)
        }
    }

    const secondsLeft = lockUntil ? Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000)) : 0

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
                        disabled={loading || secondsLeft > 0}
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
                        disabled={loading || secondsLeft > 0}
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
                            disabled={loading || secondsLeft > 0}
                        />
                        Mantener sesión iniciada (4 horas)
                    </label>
                </div>
                {error && <div className="error-message">{error}</div>}
                {attempts > 0 && attempts < MAX_ATTEMPTS && (
                    <div className="login-attempts">
                        <span>Intentos fallidos: {attempts} / {MAX_ATTEMPTS}</span>
                    </div>
                )}
                {secondsLeft > 0 && (
                    <div className="login-locked">
                        <span>
                            Demasiados intentos fallidos. Espere {secondsLeft} segundos para volver a intentar.
                        </span>
                    </div>
                )}
                <button type="submit" disabled={loading || secondsLeft > 0}>
                    {loading ? 'Ingresando...' : secondsLeft > 0 ? 'Bloqueado' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    )
}

export default Login
