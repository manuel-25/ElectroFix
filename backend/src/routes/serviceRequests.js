import express from 'express'
import ServiceRequestController from '../controllers/serviceRequestController.js'
import authenticateJWT from '../middlewares/authenticateJWT.js'

const router = express.Router()

// Ruta para crear una nueva solicitud de servicio
router.post('/', authenticateJWT, ServiceRequestController.createServiceRequest)

export default router