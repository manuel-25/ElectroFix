// Refactorizado - Perfil.jsx
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
  const [users, setUsers] = useState([])
  const [editMode, setEditMode] = useState(null)
  const [editData, setEditData] = useState({})
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState('')
  const [pendingChange, setPendingChange] = useState(null)
  const [error, setError] = useState(null)

  const formatDateTime = (val) =>
    val ? new Date(val).toLocaleString('es-AR') : '—'

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${getApiUrl()}/api/manager/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data)
    }
    if (token) fetchUser()
  }, [token])

  useEffect(() => {
    if (!user || !['admin', 'supervisor'].includes(user.role)) return
    const fetchUsers = async () => {
      const res = await axios.get(`${getApiUrl()}/api/manager`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const list = user.role === 'admin'
        ? res.data // admin ve a todos, incluidos otros admins
        : res.data.filter(u => u.role !== 'admin' && u.branch === user.branch)
      setUsers(list)
    }
    fetchUsers()
  }, [user, token])

  const handleEditClick = (email) => {
    setEditMode(email)
    setEditData(users.find(u => u.email === email) || {})
  }

  const handleFieldChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const confirmPassword = async () => {
    try {
      await axios.post(`${getApiUrl()}/api/manager/verify-password`, { password }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await handleUserUpdate(...pendingChange)
      setShowPasswordPrompt(false)
      setPassword('')
      setPendingChange(null)
    } catch {
      setError('Contraseña incorrecta.')
    }
  }

  const handleUserUpdate = async (email, field, value) => {
    // Cambios sensibles: rol/activo requieren contraseña
    if (field === 'role' || field === 'isActive') {
      setPendingChange([email, field, value])
      setShowPasswordPrompt(true)
      return
    }

    try {
      if (field === 'all') {
        // Sanitizar campos permitidos en edición masiva
        const payload = {
          firstName: value.firstName,
          lastName: value.lastName,
          phone: value.phone ?? null,
          branch: value.branch === 'Ninguna' ? null : value.branch,
          notes: value.notes ?? '' // ✅ permitir editar notas
        }
        await axios.put(`${getApiUrl()}/api/manager/${email}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(prev => prev.map(u => (u.email === email ? { ...u, ...payload } : u)))
        setEditMode(null)
        return
      }

      // Actualización de un solo campo
      const payload = field === 'branch'
        ? { branch: value === 'Ninguna' ? null : value }
        : { [field]: value }

      await axios.put(`${getApiUrl()}/api/manager/${email}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(prev => prev.map(u => (u.email === email ? { ...u, ...payload } : u)))
      if (editMode === email) setEditMode(null)
    } catch (err) {
      console.error('Error actualizando usuario:', err)
      setError(err.response?.data?.error || 'No se pudo actualizar el usuario.')
    }
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
          <p><strong>Último acceso:</strong> {formatDateTime(user.lastLoginAt)}</p>
        </div>

        {['admin', 'supervisor'].includes(user.role) && (
          <div className="perfil-admin-section">
            <h3>Gestión de Usuarios</h3>
            <div className="table-wrapper">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Sucursal</th>
                    <th>Activo</th>
                    <th>Último acceso</th> {/* ✅ Nueva columna */}
                    <th>Notas</th>         {/* ✅ Nueva columna editable */}
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => {
                    const isEditing = editMode === u.email
                    const isAdminUser = u.role === 'admin' // admins no editables

                    return (
                      <tr key={u.email}>
                        <td>{u.email}</td>
                        <td>{isEditing ? (
                          <input
                            value={editData.firstName || ''}
                            onChange={e => handleFieldChange('firstName', e.target.value)}
                            disabled={isAdminUser}
                          />
                        ) : u.firstName}</td>
                        <td>{isEditing ? (
                          <input
                            value={editData.lastName || ''}
                            onChange={e => handleFieldChange('lastName', e.target.value)}
                            disabled={isAdminUser}
                          />
                        ) : u.lastName}</td>
                        <td>{isEditing ? (
                          <input
                            value={editData.phone || ''}
                            onChange={e => handleFieldChange('phone', e.target.value)}
                            disabled={isAdminUser}
                          />
                        ) : u.phone || '—'}</td>
                        <td>{isEditing ? (
                          <select
                            value={editData.role}
                            onChange={e => handleFieldChange('role', e.target.value)}
                            disabled={isAdminUser}
                          >
                            <option value="empleado">Empleado</option>
                            <option value="tecnico">Técnico</option>
                            <option value="supervisor">Supervisor</option>
                          </select>
                        ) : u.role}</td>
                        <td>{isEditing ? (
                          <select
                            value={editData.branch || 'Ninguna'}
                            onChange={e =>
                              handleFieldChange('branch', e.target.value === 'Ninguna' ? null : e.target.value)
                            }
                            disabled={isAdminUser}
                          >
                            {BRANCHES.map(b => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        ) : (u.branch || 'Ninguna')}</td>
                        <td>{isEditing ? (
                          <input
                            type="checkbox"
                            checked={!!editData.isActive}
                            onChange={e => handleFieldChange('isActive', e.target.checked)}
                            disabled={isAdminUser}
                          />
                        ) : (u.isActive ? '✔️' : '❌')}</td>

                        {/* ✅ Último acceso (solo lectura) */}
                        <td>{formatDateTime(u.lastLoginAt)}</td>

                        {/* ✅ Notas (editable salvo admins) */}
                        <td>
                          {isEditing ? (
                            <textarea
                              value={editData.notes || ''}
                              onChange={e => handleFieldChange('notes', e.target.value)}
                              rows={2}
                              disabled={isAdminUser}
                              style={{ width: '180px', resize: 'vertical' }}
                            />
                          ) : (u.notes?.trim() || '—')}
                        </td>

                        <td>
                          {isEditing ? (
                            <button onClick={() => handleUserUpdate(u.email, 'all', editData)}>Guardar</button>
                          ) : (
                            <button onClick={() => handleEditClick(u.email)} disabled={isAdminUser}>
                              Editar
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showPasswordPrompt && (
          <div className="password-modal">
            <h4>Confirmar contraseña</h4>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={confirmPassword}>Confirmar</button>
            <button onClick={() => setShowPasswordPrompt(false)}>Cancelar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Perfil
