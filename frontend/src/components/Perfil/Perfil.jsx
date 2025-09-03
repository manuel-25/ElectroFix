import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getApiUrl } from '../../config'
import { AuthContext } from '../../Context/AuthContext'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import './Perfil.css'

const BRANCHES = ['Quilmes', 'Barracas', 'Ninguna']

const Perfil = () => {
  const { auth } = useContext(AuthContext)
  const token = auth?.token
  const [user, setUser] = useState(null)
  const [phone, setPhone] = useState('')
  const [phoneChanged, setPhoneChanged] = useState(false)
  const [success, setSuccess] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${getApiUrl()}/api/manager/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data)
      setPhone(res.data.phone || '')
    }

    if (token) fetchUser()
  }, [token])

  useEffect(() => {
    if (!user || !['admin', 'supervisor'].includes(user.role)) return

    const fetchUsers = async () => {
      const res = await axios.get(`${getApiUrl()}/api/manager`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const list = user.role === 'admin' ? res.data : res.data.filter(u => u.branch === user.branch)
      setUsers(list)
    }

    fetchUsers()
  }, [user, token])

  const handlePhoneSave = async () => {
    await axios.put(`${getApiUrl()}/api/manager/${user.email}`, { phone }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setPhoneChanged(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleUserUpdate = async (email, field, value) => {
    await axios.put(`${getApiUrl()}/api/manager/${email}`, { [field]: value }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setUsers(users.map(u => u.email === email ? { ...u, [field]: value } : u))
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="perfil-wrapper">
        <h2 className="perfil-title">👤 Mi Perfil</h2>

        <div className="perfil-card">
          <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>Sucursal:</strong> {user.branch || 'Ninguna'}</p>
          <p><strong>Último acceso:</strong> {new Date(user.lastLoginAt).toLocaleString('es-AR')}</p>
        </div>

        <div className="perfil-form">
          <label>📱 Teléfono:</label>
          <input
            type="text"
            value={phone}
            onChange={e => {
              setPhone(e.target.value)
              setPhoneChanged(true)
            }}
          />
          {phoneChanged && (
            <button onClick={handlePhoneSave}>Guardar teléfono</button>
          )}
          {success && <p className="perfil-success">✅ Teléfono actualizado</p>}
        </div>

        {['admin', 'supervisor'].includes(user.role) && (
          <div className="perfil-admin-section">
            <h3>Gestión de Usuarios</h3>
            <table className="perfil-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Rol</th>
                  <th>Sucursal</th>
                  <th>Activo</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.email}>
                    <td>{u.email}</td>
                    <td>
                      <input
                        value={u.firstName || ''}
                        onChange={e => handleUserUpdate(u.email, 'firstName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={u.lastName || ''}
                        onChange={e => handleUserUpdate(u.email, 'lastName', e.target.value)}
                      />
                    </td>
                    <td>
                      <select value={u.role} onChange={e => handleUserUpdate(u.email, 'role', e.target.value)}>
                        <option value="admin">admin</option>
                        <option value="supervisor">supervisor</option>
                        <option value="empleado">empleado</option>
                        <option value="tecnico">tecnico</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={u.branch || 'Ninguna'}
                        onChange={e => {
                          const branch = e.target.value === 'Ninguna' ? null : e.target.value
                          handleUserUpdate(u.email, 'branch', branch)
                        }}
                      >
                        {BRANCHES.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={u.isActive}
                        onChange={e => handleUserUpdate(u.email, 'isActive', e.target.checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Perfil
