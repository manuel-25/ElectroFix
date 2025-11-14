import React, { useState } from 'react'
import { ESTADOS_SERVICIO, normalizeStatus } from '../../utils/productsData.jsx'
import { updateServiceStatus } from '../../utils/updateServiceStatus.js'
import StatusModal from '../StatusModal/StatusModal.jsx'
import Modal from '../Modal/Modal.jsx'

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
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const [nextStatus, setNextStatus] = useState(null)

  const persist = async (params) => {
    setSaving(true)
    try {
      const updated = await updateServiceStatus(params)
      onUpdated(updated)
    } catch (e) {
      console.error('[ServiceStatusControl] persist error =', e)
      onError(e)
    } finally {
      setSaving(false)
    }
  }

  const onChange = async (value) => {
    if (!service?._id || saving) return

    const yaRecibido = !!(service.receivedAtBranch && service.receivedBy && service.receivedAt)
    const seSalteaRecibido = !yaRecibido

    if (seSalteaRecibido) {
      const estadoFinal = value === 'Recibido' ? 'En Revisión' : value

      if (userBranch) {
        await persist({
          service,
          newStatus: 'Recibido',
          token,
          note,
          userEmail,
          receivedAtBranch: userBranch
        })
        await persist({
          service,
          newStatus: estadoFinal,
          token,
          note,
          userEmail,
          receivedAtBranch: userBranch
        })
      } else {
        setNextStatus(estadoFinal)
        setSelectedBranch('')
        setModalType('branch')
      }
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

          if (nextStatus && nextStatus !== 'Recibido') {
            await persist({
              service,
              newStatus: nextStatus,
              token,
              note,
              userEmail,
              receivedAtBranch: selectedBranch
            })
          }

          setNextStatus(null)
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
