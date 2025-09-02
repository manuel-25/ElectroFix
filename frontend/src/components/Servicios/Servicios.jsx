import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import Loading from '../Loading/Loading'
import { estadosServicio, branchMap } from '../../utils/productsData'
import ServiceStatusControl from '../ServiceStatusControl/ServiceStatusControl.jsx'
import './Servicios.css'

const Servicios = () => {
  const { auth } = useContext(AuthContext)

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/service`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
          withCredentials: true
        })
        setServices(res.data || [])
      } catch (e) {
        setError('Error al obtener los servicios')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [auth])

  const handleSort = key => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc'
    setSortConfig({ key, direction })
  }

  const renderSortIcon = key => {
    if (sortConfig.key !== key) return '⇅'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const handleNoteKeyDown = async (svc, e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      try {
        const updated = await axios.put(
          `${getApiUrl()}/api/service/${svc._id}/status`,
          {
            status: svc.status,
            note: e.target.value
          },
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
            withCredentials: true
          }
        )
        setServices(prev => prev.map(s => (s._id === svc._id ? { ...s, ...updated.data } : s)))
      } catch (e2) {
        alert('Error al actualizar nota')
      }
    }
  }

  const filtered = services.filter(s => {
    const term = search.trim().toLowerCase()
    return (
      s.code?.toLowerCase().includes(term) ||
      s.customerNumber?.toString().includes(term) ||
      `${s.userData?.firstName || ''} ${s.userData?.lastName || ''}`.toLowerCase().includes(term) ||
      s.equipmentType?.toLowerCase().includes(term)
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    const A = (a[sortConfig.key] || '').toString().toLowerCase()
    const B = (b[sortConfig.key] || '').toString().toLowerCase()
    if (A < B) return sortConfig.direction === 'asc' ? -1 : 1
    if (A > B) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const pageData = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">🧰 Servicios</h2>

        {loading ? (
          <div className="loading-container"><Loading /></div>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}

            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Buscar por Código, Cliente, Equipo..."
                className="search-input"
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
              />
            </div>

            <div className="items-per-page">
              <label>Mostrar </label>
              <select value={itemsPerPage} onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }}>
                {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <label> registros</label>
              <div className="right-controls">
                <Link to="/servicios/nuevo" className="btn-new-service">➕ Nuevo Servicio</Link>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="styled-table">
                <thead className="table-head">
                  <tr>
                    <th onClick={() => handleSort('code')}>Código {renderSortIcon('code')}</th>
                    <th onClick={() => handleSort('customerNumber')}>Cliente {renderSortIcon('customerNumber')}</th>
                    <th onClick={() => handleSort('createdAt')}>Fecha {renderSortIcon('createdAt')}</th>
                    <th onClick={() => handleSort('equipmentType')}>Equipo {renderSortIcon('equipmentType')}</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Codigo</th>
                    <th>Estado</th>
                    <th>Notas</th>
                    <th>Recibido En</th>
                    <th onClick={() => handleSort('createdBy')}>Creado por {renderSortIcon('createdBy')}</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map(s => (
                    <tr key={s._id}>
                      <td><Link to={`/servicios/${s.code}`} className="service-link">{s.code}</Link></td>
                      <td>
                        <Link to={`/clientes/${s.customerNumber}`} className="service-link">
                          {s.customerNumber}
                        </Link>
                      </td>
                      <td>{new Date(s.createdAt).toLocaleDateString('es-AR')}</td>
                      <td>{s.equipmentType || '—'}</td>
                      <td>{s.description || '—'}</td>
                      <td>{s.serviceType}</td>
                      <td>{branchMap[s.code] || s.code}</td>
                      <td>
                        <ServiceStatusControl
                          service={s}
                          token={auth?.token}
                          userEmail={auth?.user?.email}
                          userBranch={auth?.user?.branch}
                          note={s.notes}
                          className={getStatusClass(s.status)}
                          onUpdated={(updated) => {
                            setServices(prev =>
                              prev.map(item => item._id === s._id ? { ...item, ...updated } : item)
                            )
                          }}
                          onError={() => alert('Error al actualizar estado')}
                        />
                      </td>
                      <td>
                        <textarea
                          className="notes-textarea"
                          defaultValue={s.notes || ''}
                          onKeyDown={(e) => handleNoteKeyDown(s, e)}
                        />
                      </td>
                      <td>{s.receivedAtBranch || 'No recibido'}</td>
                      <td>{s.createdByEmail || '—'}</td>
                      <td className="acciones-cell">
                        <Link to={`/servicios/${s.code}/editar`} className="action-btn edit">✎</Link>
                        <a href={`/ticket/${s.publicId}`} target="_blank" rel="noopener noreferrer" className="action-btn print">🖨</a>
                        {s.userData?.phone && (
                          <a
                            href={`https://wa.me/54${String(s.userData.phone).replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn wa"
                            title="WhatsApp"
                          >
                            <img src="/images/whatsappLogo.svg" alt="WA" className="wa-icon" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

function getStatusClass(status) {
  switch (status) {
    case 'Pendiente': return 'cell-pendiente'
    case 'Recibido': return 'cell-recibido'
    case 'En Revisión': return 'cell-revision'
    case 'En Reparación': return 'cell-reparacion'
    case 'En Pruebas': return 'cell-pruebas'
    case 'Listo para retirar': return 'cell-listo'
    case 'Entregado': return 'cell-entregado'
    case 'Garantía': return 'cell-garantía'
    case 'Devolución': return 'cell-devolucion'
    default: return ''
  }
}

export default Servicios
