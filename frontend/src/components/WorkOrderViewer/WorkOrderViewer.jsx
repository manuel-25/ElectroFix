// views/WorkOrderViewer.jsx
import { useParams } from 'react-router-dom'
import { getApiUrl } from '../../config'

export default function WorkOrderViewer() {
const { publicId } = useParams()
const pdfUrl = `${getApiUrl()}/api/service/public/${publicId}/print-workorder`

  return (
    <iframe
      src={pdfUrl}
      title="Orden de Trabajo PDF"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
        display: 'block',
      }}
    />
  )
}
