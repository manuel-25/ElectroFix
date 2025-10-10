import React, { useState } from 'react'
import { ESTADOS_SERVICIO, normalizeStatus } from '../../utils/productsData.jsx'
import { updateServiceStatus } from '../../utils/updateServiceStatus.js'
import StatusModal from '../StatusModal/StatusModal.jsx'

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
  const [modalType, setModalType] = useState(null)
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

    if (value === 'Recibido' && !userBranch) {
      setSelectedBranch('')
      setModalType('branch')
      return
    }

    if (value === 'Entregado') {
      setModalType('satisfaction')
      return
    }

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
        {ESTADOS_SERVICIO.map(opt => (
          <option key={opt.key} value={opt.value}>{opt.value}</option>
        ))}
      </select>

      {saving && <small style={{ marginLeft: 8 }}>Guardando…</small>}

      <StatusModal
        visible={!!modalType}
        type={modalType}
        onClose={() => setModalType(null)}
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
