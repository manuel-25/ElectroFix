import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'
import { WorkOrderDocument } from './WorkOrderDocument'
import { getApiUrl } from '../../config'

export default function WorkOrderViewer() {
  const { publicId } = useParams()
  const [service, setService] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${getApiUrl()}/api/service/public/${publicId}`)
        if (!res.ok) throw new Error('No se pudo cargar el servicio')
        const data = await res.json()
        setService(data)
      } catch (err) {
        console.error('Error cargando el servicio:', err)
        setError(true)
      }
    }

    fetchService()
  }, [publicId])

  if (error) return <div>Error al cargar el servicio.</div>
  if (!service) return <div>Cargando...</div>

  return (
    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
      <WorkOrderDocument service={service} />
    </PDFViewer>
  )
}
