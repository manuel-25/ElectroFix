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

    if (value === 'Recibido' && !userBranch) {
      setSelectedBranch('')
      setModalType('branch')
      return
    }

    if (value === 'Entregado') {
      setModalType('satisfaction')
      return
    }

    const historial = service?.history?.map(h => h.status) || []
    const yaRecibido = historial.includes('Recibido') || service.status === 'Recibido'
    const seSalteaRecibido = !yaRecibido && value !== 'Pendiente' && value !== 'Recibido'

    if (seSalteaRecibido) {
      setNextStatus(value)
      setShowSkipWarning(true)
      return
    }

    // Normal persist
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

      {showSkipWarning && (
        <Modal title="Advertencia: Falta 'Recibido'" onClose={() => setShowSkipWarning(false)}>
          <p>Este servicio aún no fue marcado como <strong>Recibido</strong>.</p>
          <p>¿Marcar como <strong>Recibido</strong> antes de cambiarlo a <strong>{nextStatus}</strong>?</p>
          <div className="btn-group" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-cancelar" onClick={() => {
              setShowSkipWarning(false)
              setNextStatus(null)
            }}>
              Cancelar
            </button>
            <button className="btn-submit" style={{ marginLeft: 10 }} onClick={async () => {
              setShowSkipWarning(false)
              if (!userBranch) {
                setSelectedBranch('')
                setModalType('branch')
                setShowSkipWarning(false)
              } else {
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
                  newStatus: nextStatus,
                  token,
                  note,
                  userEmail,
                  receivedAtBranch: userBranch
                })

                setShowSkipWarning(false)
                setNextStatus(null)
              }
              setNextStatus(null)
            }}>
              Sí, marcar como Recibido
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
