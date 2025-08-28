import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getApiUrl } from '../../config'
import { AuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import Loading from '../Loading/Loading'
import './Cotizaciones.css'

const ITEMS_PER_PAGE = 50

const Cotizaciones = () => {
  const [quotes, setQuotes] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'serviceRequestNumber', direction: 'desc' })
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [loading, setLoading] = useState(true)

  const { auth } = useContext(AuthContext)

  useEffect(() => {
  const fetchQuotes = async () => {
    try {
      const res = await axios.get(`${getApiUrl()}/api/quotes`) //axios.get(`http://localhost:5000/api/quotes`)
      setQuotes(res.data)
    } catch (err) {
      setError('Error al obtener las cotizaciones')
    } finally {
      setLoading(false)
    }
  }
  fetchQuotes()
}, [])


  const handleStatusChange = async (srn, status) => {
    try {
      await axios.put(`${getApiUrl()}/api/quotes/${srn}`, { status })
      setQuotes(prev =>
        prev.map(q =>
          q.serviceRequestNumber === srn ? { ...q, status } : q
        )
      )
    } catch {
      setError('Error al cambiar el estado')
    }
  }

  const handleReviewUpdate = async (srn, newReview) => {
    try {
      await axios.put(`${getApiUrl()}/api/quotes/${srn}`, { review: newReview })
      setQuotes(prev =>
        prev.map(q =>
          q.serviceRequestNumber === srn ? { ...q, review: newReview } : q
        )
      )
    } catch {
      setError('Error al actualizar la revisión')
    }
  }

  const filteredQuotes = quotes.filter(q =>
    q.serviceRequestNumber?.toString().includes(search.trim()) ||
    q.customerNumber?.toString().includes(search.trim())
  )

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    const { key, direction } = sortConfig
    let aVal = key === 'category' ? a.category?.name : a[key]
    let bVal = key === 'category' ? b.category?.name : b[key]

    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedQuotes.length / itemsPerPage)
  const paginatedQuotes = sortedQuotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const generateWhatsAppLink = (q) => {
  const phone = (q.userData?.phone || '').toString().replace(/\D/g, '')
  const name = q.userData?.firstName || 'cliente'
  const equipo = q.category?.name || 'equipo'
  const solicitud = q.serviceRequestNumber || ''
  const message = `Hola, ${name}! Nos comunicamos del equipo de logística Electrosafe, recibimos tu solicitud de cotización (Nº ${solicitud}) en nuestra web y quería comentarte las opciones y promociones que tenemos para reparación de tu ${equipo}.`
  return `https://wa.me/54${phone}?text=${encodeURIComponent(message)}`
}


  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">📋 Solicitud de Cotizaciones</h2>

        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Buscar N° Solicitud o Cliente..."
              className="search-input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="items-per-page">
            <label>Mostrar </label>
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
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
                  <th style={{ width: '6%' }} onClick={() => handleSort('serviceRequestNumber')}>
                    N° Solicitud {renderSortIcon('serviceRequestNumber')}
                  </th>
                  <th style={{ width: '6%' }} onClick={() => handleSort('customerNumber')}>
                    N° Cliente {renderSortIcon('customerNumber')}
                  </th>
                  <th style={{ width: '8%' }} onClick={() => handleSort('date')}>
                    Fecha {renderSortIcon('date')}
                  </th>
                  <th style={{ width: '8%' }} onClick={() => handleSort('category')}>
                    Equipo {renderSortIcon('category')}
                  </th>
                  <th style={{ width: '8%' }} onClick={() => handleSort('brand')}>
                    Marca {renderSortIcon('brand')}
                  </th>
                  <th style={{ width: '8%' }} onClick={() => handleSort('model')}>
                    Modelo {renderSortIcon('model')}
                  </th>
                  <th style={{ width: '18%' }} onClick={() => handleSort('userData.additionalDetails')}>
                    Descripción {renderSortIcon('userData.additionalDetails')}
                  </th>
                  <th style={{ width: '8%' }} onClick={() => handleSort('faults')}>
                    Fallas {renderSortIcon('faults')}
                  </th>
                  <th style={{ width: '6%' }} onClick={() => handleSort('branch')}>
                    Sucursal {renderSortIcon('branch')}
                  </th>
                  <th style={{ width: '8%' }} onClick={() => handleSort('userData.municipio')}>
                    Ubicación {renderSortIcon('userData.municipio')}
                  </th>
                  <th style={{ width: '7%' }}>Estado</th>
                  <th style={{ width: '10%' }}>Revisión</th>
                  <th style={{ width: '5%' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuotes.map((q) => {
                  const getStatusClass = (status) => {
                    switch (status) {
                      case 'Rechazada': return 'cell-rechazada'
                      case 'Presupuesto Enviado': return 'cell-presupuesto'
                      case 'Aprobada': return 'cell-aprobada'
                      case 'En revisión': return 'cell-revision'
                      case 'Listo para devolución': return 'cell-devolucion'
                      default: return ''
                    }
                  }

                  return (
                    <tr key={`${q.serviceRequestNumber}-${q.customerNumber}`}>
                      <td>
                        <Link to={`/cotizaciones/${q.serviceRequestNumber}`} className="service-link">
                          {q.serviceRequestNumber}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/clientes/${q.customerNumber}`} className="service-link">
                          {q.customerNumber}
                        </Link>
                      </td>
                      <td>{new Date(q.date).toLocaleDateString()}</td>
                      <td>{q.category?.name || 'N/A'}</td>
                      <td>{q.brand}</td>
                      <td>{q.model || 'N/A'}</td>
                      <td className="details-cell">{q.userData?.additionalDetails || 'N/A'}</td>
                      <td>{q.faults?.join(', ') || 'N/A'}</td>
                      <td>{q.branch || 'N/A'}</td>
                      <td>{q.userData?.municipio ? `${q.userData.municipio}, ${q.userData.province}` : 'N/A'}</td>
                      <td className={getStatusClass(q.status)}>
                        <select
                          className="status-select"
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.serviceRequestNumber, e.target.value)}
                        >
                          {['En revisión', 'Presupuesto Enviado', 'Aprobada', 'Rechazada', 'Listo para devolución'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="review-cell">
                        <textarea
                          className="review-textarea"
                          defaultValue={q.review || ''}
                          onBlur={(e) => handleReviewUpdate(q.serviceRequestNumber, e.target.value)}
                        />
                      </td>
                      <td>
                        {q.userData?.phone && (
                          <a
                            href={generateWhatsAppLink(q)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-btn"
                          >
                            <img src="/images/whatsappLogo.svg" alt="Logotipo de WhatsApp" id='contact-whatsapp-cotizaciones' />
                          </a>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="page-btn">◀</button>
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
                  pages.unshift(<button key={1} className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>)
                }

                if (endPage < totalPages - 1) {
                  pages.push(<span key="end-dots" className="page-dots">...</span>)
                }

                if (endPage < totalPages) {
                  pages.push(<button key={totalPages} className={`page-btn ${currentPage === totalPages ? 'active' : ''}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>)
                }

                return pages
              })()}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="page-btn">▶</button>
            </div>
          )}
        </>
      )}
      </div>
    </DashboardLayout>
  )
}

export default Cotizaciones

