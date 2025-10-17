import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import { WorkOrderDocument } from './WorkOrderDocument'
import { getApiUrl } from '../../config'
import { saveAs } from 'file-saver'

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

  const downloadPDF = async () => {
    if (!service) return
    const doc = <WorkOrderDocument service={service} />
    const blob = await pdf(doc).toBlob()

    const fullName = `${service?.userData?.firstName || ''}-${service?.userData?.lastName || ''}`.replace(/\s+/g, '-')
    const fileName = `Orden-Trabajo-${fullName}-${service?.code || 'sin-codigo'}.pdf`

    saveAs(blob, fileName)
  }

  if (error) return <div>Error al cargar el servicio.</div>
  if (!service) return <div>Cargando...</div>

  return (
    <>
      {/* Botón de descarga arriba */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '16px 24px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
      }}>
        <button
          onClick={downloadPDF}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          📥 Descargar PDF
        </button>
      </div>

      {/* Visor PDF */}
      <PDFViewer style={{ width: '100vw', height: '90vh' }}>
        <WorkOrderDocument service={service} />
      </PDFViewer>
    </>
  )
}
