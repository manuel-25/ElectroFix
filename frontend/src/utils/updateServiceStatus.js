import axios from 'axios'
import { getApiUrl } from '../config'

export const updateServiceStatus = async ({
  service,
  newStatus,
  note = '',
  userEmail = '',
  receivedAtBranch = null,
  isSatisfied = null,
  deliveredAt = null,
}) => {
  if (!service?._id || !newStatus) {
    console.warn('[updateServiceStatus] Faltan datos obligatorios', { service, newStatus })
    return
  }

  const payload = { status: newStatus, note }

  if (newStatus === 'Recibido') {
    if (userEmail) payload.receivedBy = userEmail
    if (receivedAtBranch) payload.receivedAtBranch = receivedAtBranch
  }

  if (newStatus === 'Entregado') {
    payload.deliveredAt = deliveredAt || new Date().toISOString()
    if (typeof isSatisfied === 'boolean') payload.isSatisfied = isSatisfied
  }

  console.log('[updateServiceStatus] Enviando payload:', payload)

  const res = await axios.put(
    `${getApiUrl()}/api/service/${service._id}/status`,
    payload,
    { withCredentials: true }
  )

  console.log('[updateServiceStatus] Respuesta:', res.data)

  return res.data
}
