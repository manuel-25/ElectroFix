// backend/src/controllers/workOrderController.js
import ServiceManager from '../Mongo/ServiceManager.js'

const WorkOrderController = {
  async getPublicService(req, res) {
    const { publicId } = req.params
    try {
      const service = await ServiceManager.getByPublicId(publicId)

      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
      }

      res.json(service)
    } catch (err) {
      console.error('Error al obtener servicio:', err)
      res.status(500).json({ error: 'Error interno', message: err.message })
    }
  }
}

export default WorkOrderController
