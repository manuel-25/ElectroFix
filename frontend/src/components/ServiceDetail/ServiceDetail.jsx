import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import { estadosServicio } from '../../utils/productsData.jsx'
import SucursalModal from '../SucursalModal/SucursalModal.jsx'
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

/* ========= helpers de estado ======== */
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

const statusClassMap = {
  pendiente : 'status-pendiente',
  recibido  : 'status-recibido',
  revision  : 'status-revision',
  reparacion: 'status-reparacion',
  pruebas   : 'status-pruebas',
  listo     : 'status-listo',
  entregado : 'status-entregado',
  garantia  : 'status-garantia',
  rechazado : 'status-rechazado'
}

const StatusPill = ({ status }) => {
  const key = normalizeStatus(status || '')
  const cls = statusClassMap[key] || 'status-desconocido'
  return <span className={`status-pill ${cls}`}>{status || '—'}</span>
}

const StatusSelect = ({ value, onChange, disabled }) => {
  const key = normalizeStatus(value || '')
  return (
    <select
      className={`status-select cell-${key}`}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="" disabled>Seleccioná…</option>
      {estadosServicio.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

/* ============== Página ============== */
const ServiceDetail = () => {
  const { auth } = useContext(AuthContext)
  const { code } = useParams()
  const [service, setService] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [notesText, setNotesText] = useState('')
  const [toast, setToast] = useState({ type: 'error', message: '' })

  // Modal sucursal (coherente con Servicios)
  const [showSucursalModal, setShowSucursalModal] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState('')

  const navigate = useNavigate()

  const authHeader = { Authorization: `Bearer ${auth?.token}` }
  const showToast = (message, type = 'error') => setToast({ message, type })
  const clearToast = () => setToast({ type: 'error', message: '' })

  const fetchService = async () => {
    try {
      const { data } = await axios.get(
        `${getApiUrl()}/api/service/code/${code}`,
        { headers: authHeader, withCredentials: true }
      )
      setService(data)
      setNotesText(data?.notes || '')
    } catch (err) {
      setError('Error al obtener el servicio')
      showToast(getApiError(err))
    }
  }

  useEffect(() => {
    if (!code) return
    fetchService()
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

  useEffect(() => {
  console.log('auth.user:', auth?.user)
}, [])

  // Cambiar estado; si el user no tiene branch y selecciona "Recibido", abre modal.
  const handleStatusChange = async (newStatus, branchFromModal = null) => {
    if (!service?._id || saving) return

    console.log('user.branch:', auth?.user?.branch)
    console.log('branchFromModal:', branchFromModal)

    const userFixedBranch = auth?.user?.branch || null
    const isRecibido = newStatus === 'Recibido'

    if (isRecibido && !userFixedBranch && !branchFromModal) {
      setSelectedBranch('')
      setShowSucursalModal(true)
      return
    }

    setSaving(true)
    try {
      const payload = {
        status: newStatus,
        note: notesText,
        ...(isRecibido && {
          receivedBy: auth?.user?.email || '-',
          receivedAtBranch: branchFromModal || userFixedBranch
        })
      }

      await axios.put(
        `${getApiUrl()}/api/service/${service._id}/status`,
        payload,
        { headers: authHeader, withCredentials: true }
      )
      await fetchService()
      showToast('Estado actualizado correctamente.', 'success')
    } catch (err) {
      showToast(getApiError(err), 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleNoteKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      try {
        await axios.put(
          `${getApiUrl()}/api/service/${service._id}/status`,
          { status: service.status, note: notesText },
          { headers: authHeader, withCredentials: true }
        )
        await fetchService()
        showToast('Nota guardada y registrada en historial.', 'success')
      } catch (err) {
        showToast(getApiError(err), 'error')
      }
    }
  }

  const handleConfirmSucursal = async () => {
    if (!selectedBranch) return
    setShowSucursalModal(false)              // <-- FIX (antes tenías showSucursalModal(false))
    await handleStatusChange('Recibido', selectedBranch)
  }

  if (error) return <DashboardLayout><p className="error-message">{error}</p></DashboardLayout>
  if (!service) return <DashboardLayout><p className="loading-message">Cargando...</p></DashboardLayout>

  return (
    <DashboardLayout>
      <Toast type={toast.type} message={toast.message} onClose={clearToast} />

      <div className="detail-container">
        <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
        <h2 className="title">🔍 Detalle del Servicio: {service.code}</h2>

        <div className="info-group">
          <div className="info-column">
            <h3>Cliente</h3>
            <Item
              label="Cliente #"
              value={
                <Link to={`/clientes/${service.customerNumber}`} className="service-link">
                  {service.customerNumber}
                </Link>
              }
            />
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
            <Item label="Valor Aproximado" value={currency(service.approximateValue)} />
            <Item label="Valor Final" value={currency(service.finalValue)} />
            <Item label="Repuestos" value={currency(service.repuestos)} />
          </div>

          <div className="info-column">
            <h3>Estado</h3>
            <Item label="Estado Actual" value={<StatusPill status={service.status} />} />
            <Item
              label="Actualizar estado"
              value={
                <div style={{ minWidth: 220 }}>
                  <StatusSelect value={service.status} onChange={handleStatusChange} disabled={saving} />
                  {saving && <small style={{ marginLeft: 8 }}>Guardando…</small>}
                </div>
              }
            />
            <Item label="Recibido por" value={service.receivedBy} />
            <Item label="Modificado por" value={service.lastModifiedBy} />
            <Item label="Última modificación" value={service.lastModifiedAt ? new Date(service.lastModifiedAt).toLocaleString() : '—'} />
            <Item label="Garantía hasta" value={service.warrantyExpiration ? new Date(service.warrantyExpiration).toLocaleDateString() : '—'} />
          </div>
        </div>

        <div className="section">
          <h3>Notas del Técnico</h3>
          <textarea
            className="notes-textarea"
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            onKeyDown={handleNoteKeyDown}
            placeholder="Escribí y presioná Enter para guardar (Shift+Enter para salto de línea)"
          />
        </div>

        <div className="section">
          <h3>Historial de Estado</h3>
          <div className="historial-container">
            <ul className="history-list">
              {history.map((h, i) => (
                <li key={i} className="history-item">
                  <div className="history-main">
                    <span className="history-date">{new Date(h.changedAt).toLocaleString()}</span>
                    <StatusPill status={h.status} />
                    <span className="history-by">({h.changedBy})</span>
                  </div>
                  {h.note && (
                    <div className="history-note">
                      📝 <em>{h.note}</em>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section">
          <h3>Metadatos</h3>
          <Item label="Creado por" value={service.createdByEmail || service.createdBy} />
          <Item label="Fecha de creación" value={service.createdAt ? new Date(service.createdAt).toLocaleString() : '—'} />
          <Item label="Última actualización" value={service.updatedAt ? new Date(service.updatedAt).toLocaleString() : '—'} />
        </div>

        <div className="actions">
          <Link to={`/servicios/${service.code}/editar`} className="btn">✏️ Editar</Link>
          <Link to={`/servicios/${service.code}/imprimir`} className="btn">🖨 Imprimir</Link>
        </div>
      </div>

      <SucursalModal
        visible={showSucursalModal}
        onClose={() => setShowSucursalModal(false)}
        onConfirm={handleConfirmSucursal}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />
    </DashboardLayout>
  )
}

export default ServiceDetail
