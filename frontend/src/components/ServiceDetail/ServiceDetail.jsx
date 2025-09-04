import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import { statusClassMap } from '../../utils/productsData.jsx'
import ServiceStatusControl from '../ServiceStatusControl/ServiceStatusControl.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPrint } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import './ServiceDetail.css'

/* ============== UI helpers ============== */
const Item = ({ label, value }) => (
  <div className="item">
    <span className="item-label">{label}</span>
    <span className="item-value">{value ?? '—'}</span>
  </div>
)

const Toast = ({ type = 'error', message, onClose }) => {
  if (!message) return null
  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  )
}

const getApiError = (err) => {
  if (err?.response) {
    const msg = err.response.data?.error || err.response.data?.message
    if (err.response.status === 401) return msg || 'Tu sesión expiró. Iniciá sesión nuevamente.'
    if (err.response.status === 403) return msg || 'No tenés permisos para realizar esta acción.'
    return msg || `Error ${err.response.status} al procesar la solicitud.`
  }
  if (err?.request) return 'No pudimos contactar el servidor. Verificá tu conexión.'
  return 'Ocurrió un error inesperado.'
}

/* ========= helpers de estado/fechas ======== */
const slug = (s = '') =>
  s.toString().trim().toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '-')

const normalizeStatus = (raw = '') => {
  const s = slug(raw)
  if (s.includes('devolucion')) return 'rechazado'
  if (s.includes('listo-para-retirar')) return 'listo'
  if (s.includes('en-pruebas')) return 'pruebas'
  if (s.includes('en-revision')) return 'revision'
  if (s.includes('en-reparacion')) return 'reparacion'
  return s
}

const StatusPill = ({ status }) => {
  const key = normalizeStatus(status || '')
  const cls = statusClassMap[key] || 'status-desconocido'
  return <span className={`status-pill ${cls}`}>{status || '—'}</span>
}

const addDays = (date, days) => {
  if (!date || days == null) return null
  const d = new Date(date)
  d.setDate(d.getDate() + Number(days))
  return d
}
const fmt = (d) => d ? new Date(d).toLocaleString('es-AR') : '—'

/* ============== Página ============== */
const ServiceDetail = () => {
  const { auth } = useContext(AuthContext)
  const { code } = useParams()
  const [service, setService] = useState(null)
  const [error, setError] = useState(null)
  const [notesText, setNotesText] = useState('')
  const [toast, setToast] = useState({ type: 'error', message: '' })

  const navigate = useNavigate()

  const showToast = (message, type = 'error') => setToast({ message, type })
  const clearToast = () => setToast({ type: 'error', message: '' })

  const fetchService = async () => {
    try {
      const { data } = await axios.get(
        `${getApiUrl()}/api/service/code/${code}`,
        { headers: { Authorization: `Bearer ${auth?.token}` }, withCredentials: true }
      )
      setService(data)
      setNotesText(data?.notes || '')
    } catch (err) {
      setError('Error al obtener el servicio')
      showToast(getApiError(err))
    }
  }

  useEffect(() => {
    if (code) fetchService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const currency = (n) =>
    typeof n === 'number'
      ? n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
      : n ? String(n) : '—'

  const history = useMemo(() => {
    if (!service) return []
    const isFilled = (v) => v != null && String(v).trim().toLowerCase() && String(v).trim().toLowerCase() !== 'no recibido'
    let list = [...(service.statusHistory ?? [])]
    const isReceived = isFilled(service.receivedBy) || isFilled(service.receivedAt)
    if (!isReceived) {
      list = list.filter(ev => normalizeStatus(ev.status) !== 'recibido')
    }
    list.sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt))
    const dedup = []
    for (const ev of list) {
      const last = dedup[dedup.length - 1]
      if (!last || normalizeStatus(last.status) !== normalizeStatus(ev.status) || ev.note) {
        dedup.push(ev)
      }
    }
    const createdAt = service.createdAt ? new Date(service.createdAt) : null
    const createdBy = service.createdByEmail || service.createdBy
    const hasPending = list.some(x => normalizeStatus(x.status) === 'pendiente')
    if (createdAt && createdBy && !hasPending) {
      dedup.unshift({
        changedAt: createdAt.toISOString(),
        status: 'Pendiente',
        changedBy: createdBy,
        _createdEntry: true
      })
    }
    return dedup
  }, [service])

  const handleNoteKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      try {
        const res = await axios.put(
          `${getApiUrl()}/api/service/${service._id}/status`,
          {
            status: service.status,
            note: notesText
          },
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
            withCredentials: true
          }
        )
        setService(res.data)
        showToast('Nota guardada y registrada en historial.', 'success')
      } catch (err) {
        showToast(getApiError(err), 'error')
      }
    }
  }

  if (error) return <DashboardLayout><p className="error-message">{error}</p></DashboardLayout>
  if (!service) return <DashboardLayout><p className="loading-message">Cargando...</p></DashboardLayout>

  const warrantyBase = service.deliveredAt || service.receivedAt || service.createdAt
  const warrantyEnds = addDays(warrantyBase, service.warrantyExpiration)

  return (
    <DashboardLayout>
      <Toast type={toast.type} message={toast.message} onClose={clearToast} />

      <div className="detail-container">
        <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
        <h2 className="title">🔍 Detalle del Servicio: {service.code}</h2>
        <div className="actions">
          <Link to={`/servicios/${service.code}/editar`} className="action-btn big-btn edit" title="Editar">
            <FontAwesomeIcon icon={faPen} />
          </Link>

          <a href={`/ticket/${service.publicId}`} target="_blank" rel="noopener noreferrer" className="action-btn big-btn print" title="Imprimir">
            <FontAwesomeIcon icon={faPrint} />
          </a>

          <a
            href={`https://wa.me/54${String(service.userData.phone).replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn big-btn wa"
            title="WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
        <div className="info-group">
          <div className="info-column">
            <h3>Cliente</h3>
            <Item label="Cliente #" value={<Link to={`/clientes/${service.customerNumber}`} className="service-link">{service.customerNumber}</Link>} />
            <Item label="Nombre" value={`${service.userData?.firstName ?? ''} ${service.userData?.lastName ?? ''}`.trim() || '—'} />
            <Item label="Email" value={service.userData?.email} />
            <Item label="Teléfono" value={service.userData?.phone} />
            <Item label="Dirección" value={service.userData?.domicilio} />
            <Item label="Provincia / Municipio" value={[service.userData?.province, service.userData?.municipio].filter(Boolean).join(' / ') || '—'} />
          </div>

          <div className="info-column">
            <h3>Equipo</h3>
            <Item label="Tipo" value={service.equipmentType} />
            <Item label="Marca" value={service.brand} />
            <Item label="Modelo" value={service.model} />
            <Item label="Servicio" value={service.serviceType} />
            <Item label="Descripción" value={service.description} />
          </div>

          <div className="info-column">
            <h3>Costos</h3>
            <Item
              label="Ref. Cotización"
              value={
                service.quoteReference
                  ? <Link to={`/cotizaciones/${service.quoteReference}`} className="service-link strong-link">#{service.quoteReference}</Link>
                  : '—'
              }
            />
            <Item label="Valor Aproximado" value={service.approximateValue || '—'} />
            <Item label="Valor Final" value={<span className="strong">{currency(service.finalValue)}</span>} />
            <Item label="Repuestos" value={currency(service.repuestos)} />
          </div>

          <div className="info-column">
            <h3>Estado</h3>
            <Item label="Estado Actual" value={<StatusPill status={service.status} />} />
            <Item
              label="Actualizar estado"
              value={
                <ServiceStatusControl
                  service={service}
                  token={auth?.token}
                  userEmail={auth?.user?.email}
                  userBranch={auth?.user?.branch}
                  note={notesText}
                  onUpdated={(updatedService) => {
                    setService(updatedService)
                    showToast('Estado actualizado correctamente.', 'success')
                  }}
                  onError={(err) => showToast(getApiError(err), 'error')}
                />
              }
            />
            <Item label="Recibido por" value={service.receivedBy || '—'} />
            <Item label="Modificado por" value={service.lastModifiedBy || '—'} />
            <Item label="Última modificación" value={fmt(service.lastModifiedAt)} />
          </div>
        </div>

        <div className="info-group">
          <div className="info-column">
            <h3>Recepción</h3>
            <Item label="Fecha de recepción" value={fmt(service.receivedAt)} />
            <Item label="Codigo" value={service.code || '—'} />
            <Item label="Sucursal" value={service.receivedAtBranch || '—'} />
            <Item label="Método de entrega" value={service.deliveryMethod || '—'} />
            {service.receivedNotes ? <Item label="Notas de recepción" value={service.receivedNotes} /> : null}
          </div>

          <div className="info-column">
            <h3>Entrega</h3>
            <Item label="Entregado el" value={fmt(service.deliveredAt)} />
            <Item
              label="Solicitar Calificación en Google"
              value={
                service.isSatisfied === true ? '✅ Si'
                  : service.isSatisfied === false ? '❌ No recomendado'
                    : '—'
              }
            />
          </div>

          <div className="info-column">
            <h3>Garantía</h3>
            <Item label="Días de garantía" value={service.warrantyExpiration ?? '—'} />
            <Item label="Desde" value={fmt(warrantyBase)} />
            <Item label="Hasta" value={fmt(warrantyEnds)} />
          </div>

          <div className="info-column">
            <h3>Metadatos</h3>
            <Item label="Creado por" value={service.createdByEmail || service.createdBy || '—'} />
            <Item label="Fecha de creación" value={fmt(service.createdAt)} />
            <Item label="Última actualización" value={fmt(service.updatedAt)} />
            <Item label="ID público" value={service.publicId || '—'} />
          </div>
        </div>

        {/* ====== Notas ====== */}
        <div className="section">
          <h3>Notas del Técnico (Uso Interno)</h3>
          <textarea
            className="notes-textarea"
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            onKeyDown={handleNoteKeyDown}
            placeholder="Escribí y presioná Enter para guardar (Shift+Enter para salto de línea)"
          />
        </div>

        {/* ====== Historial ====== */}
        <div className="section">
          <h3>Historial de Estado</h3>
          <div className="historial-container">
            <ul className="history-list">
              {history.map((h, i) => {
                const prev = history[i - 1]
                const showNote = h.note && (!prev || h.note !== prev.note)

                return (
                  <li key={i} className="history-item">
                    <div className="history-main">
                      <span className="history-date">{fmt(h.changedAt)}</span>
                      <StatusPill status={h.status} />
                      <span className="history-by">({h.changedBy})</span>
                    </div>

                    <ul className="history-details">
                      {showNote && <li>📝 <em>{h.note}</em></li>}
                      {h.receivedBy && <li>👤 Recibido por: {h.receivedBy}</li>}
                      {h.receivedAtBranch && <li>🏢 Sucursal: {h.receivedAtBranch}</li>}
                      {h.deliveredAt && <li>📦 Entregado: {fmt(h.deliveredAt)}</li>}
                      {typeof h.isSatisfied === 'boolean' && (
                        <li>⭐ Cliente satisfecho: {h.isSatisfied ? 'Sí ✅' : 'No ❌'}</li>
                      )}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ServiceDetail
