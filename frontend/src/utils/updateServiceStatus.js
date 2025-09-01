import axios from 'axios'
import { getApiUrl } from '../config'

export const updateServiceStatus = async ({
  service,
  newStatus,
  token,
  note = '',
  userEmail = '',
  receivedAtBranch = null,
  isSatisfied = null,
  deliveredAt = null,
}) => {
  if (!service?._id || !newStatus || !token) return

  const payload = { status: newStatus, note }

  if (newStatus === 'Recibido') {
    if (userEmail) payload.receivedBy = userEmail
    if (receivedAtBranch) payload.receivedAtBranch = receivedAtBranch
  }

  if (newStatus === 'Entregado') {
    payload.deliveredAt = deliveredAt || new Date().toISOString()
    if (typeof isSatisfied === 'boolean') payload.isSatisfied = isSatisfied
  }

  const res = await axios.put(
    `${getApiUrl()}/api/service/${service._id}/status`,
    payload,
    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
  )
  return res.data
}
