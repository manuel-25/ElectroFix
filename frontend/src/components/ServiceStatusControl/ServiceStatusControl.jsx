import React, { useState } from 'react'
import { estadosServicio } from '../../utils/productsData.jsx'
import { updateServiceStatus } from '../../utils/updateServiceStatus'
import StatusModal from '../StatusModal/StatusModal.jsx'

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

export default function ServiceStatusControl({
  service,
  token,
  userEmail,
  userBranch,
  note = '',
  disabled = false,
  onUpdated = () => {},
  onError = () => {},
  className = '',
  branches = ['Quilmes', 'Barracas'],
}) {
  const [saving, setSaving] = useState(false)

  // modal genérico
  const [modalType, setModalType] = useState(null) // 'branch' | 'satisfaction' | null
  const [selectedBranch, setSelectedBranch] = useState('')

  const persist = async (params) => {
    setSaving(true)
    try {
      const updated = await updateServiceStatus(params)
      onUpdated(updated)
    } catch (e) {
      onError(e)
    } finally {
      setSaving(false)
    }
  }

  const onChange = async (value) => {
    if (!service?._id || saving) return

    // Recibido: si no hay branch fijo, pedimos sucursal
    if (value === 'Recibido' && !userBranch) {
      setSelectedBranch('')
      setModalType('branch')
      return
    }

    // Entregado: pedimos satisfacción
    if (value === 'Entregado') {
      setModalType('satisfaction')
      return
    }

    // Otros estados: directo
    await persist({
      service,
      newStatus: value,
      token,
      note,
      userEmail,
      receivedAtBranch: userBranch || null
    })
  }

  const key = normalizeStatus(service?.status || '')

  return (
    <>
      <select
        className={`status-select cell-${key} ${className}`}
        value={service?.status || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || saving}
      >
        {estadosServicio.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {saving && <small style={{ marginLeft: 8 }}>Guardando…</small>}

      {/* Modal único */}
      <StatusModal
        visible={!!modalType}
        type={modalType}
        onClose={() => setModalType(null)}
        /* branch mode */
        branches={branches}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        onConfirmBranch={async () => {
          if (!selectedBranch) return
          setModalType(null)
          await persist({
            service,
            newStatus: 'Recibido',
            token,
            note,
            userEmail,
            receivedAtBranch: selectedBranch
          })
        }}
        /* satisfaction mode */
        onConfirmSatisfaction={async (yes) => {
          setModalType(null)
          await persist({
            service,
            newStatus: 'Entregado',
            token,
            note,
            isSatisfied: !!yes
          })
        }}
      />
    </>
  )
}
