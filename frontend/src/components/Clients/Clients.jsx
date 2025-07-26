import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getApiUrl } from '../../config'
import { AuthContext } from '../../Context/AuthContext'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import Loading from '../Loading/Loading'
import './Clients.css'

const Clients = () => {
  const { auth } = useContext(AuthContext)
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'customerNumber', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/client`, { //`${getApiUrl()}/api/client`
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        })
        setClients(res.data)
      } catch (err) {
        console.error('Error al obtener los clientes')
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc'
    setSortConfig({ key, direction })
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const sortedClients = [...clients].sort((a, b) => {
    const aVal = a[sortConfig.key]
    const bVal = b[sortConfig.key]

    if (typeof aVal === 'string') return sortConfig.direction === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal)

    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
  })

  const filteredClients = sortedClients.filter(c =>
    c.customerNumber?.toString().includes(search.trim())
  )

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">📁 Clientes Registrados</h2>

        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <>
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por N° de cliente"
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            <div className="items-per-page">
              <label>Mostrar </label>
              <select value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))}>
                {[10, 25, 50, 100].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <label> registros</label>
            </div>

            <div className="table-wrapper">
              <table className="styled-table">
                <thead className="table-head">
                  <tr>
                    <th onClick={() => handleSort('customerNumber')}>N° Cliente {renderSortIcon('customerNumber')}</th>
                    <th onClick={() => handleSort('firstName')}>Nombre {renderSortIcon('firstName')}</th>
                    <th onClick={() => handleSort('lastName')}>Apellido {renderSortIcon('lastName')}</th>
                    <th onClick={() => handleSort('phone')}>Teléfono {renderSortIcon('phone')}</th>
                    <th onClick={() => handleSort('email')}>Email {renderSortIcon('email')}</th>
                    <th onClick={() => handleSort('municipio')}>Ubicación {renderSortIcon('municipio')}</th>
                    <th onClick={() => handleSort('serviceRequestNumbers')}>Solicitudes {renderSortIcon('serviceRequestNumbers')}</th>
                    <th onClick={() => handleSort('createdAt')}>Fecha {renderSortIcon('createdAt')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClients.map(client => (
                    <tr key={client._id}>
                      <td>{client.customerNumber}</td>
                      <td>{client.firstName || 'N/A'}</td>
                      <td>{client.lastName || 'N/A'}</td>
                      <td>{client.phone || 'N/A'}</td>
                      <td>{client.email || 'N/A'}</td>
                      <td>{client.municipio}, {client.province}</td>
                      <td>
                        {Array.isArray(client.serviceRequestNumbers) && client.serviceRequestNumbers.length > 0
                          ? client.serviceRequestNumbers.join(', ')
                          : '—'}
                      </td>
                      <td>{client.createdAt?.split(',')[0] || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="page-btn">◀</button>
                {(() => {
                  const pages = []
                  const visiblePages = 5
                  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
                  const endPage = Math.min(totalPages - 1, startPage + visiblePages - 1)

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button key={i} className={`page-btn ${currentPage === i ? 'active' : ''}`} onClick={() => setCurrentPage(i)}>
                        {i}
                      </button>
                    )
                  }

                  if (startPage > 1) {
                    pages.unshift(<span key="start-dots" className="page-dots">...</span>)
                    pages.unshift(<button key={1} className="page-btn" onClick={() => setCurrentPage(1)}>1</button>)
                  }

                  if (endPage < totalPages - 1) {
                    pages.push(<span key="end-dots" className="page-dots">...</span>)
                  }

                  if (endPage < totalPages) {
                    pages.push(<button key={totalPages} className="page-btn" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>)
                  }

                  return pages
                })()}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="page-btn">▶</button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Clients
