import express from 'express';
import ServiceRequestController from '../controllers/serviceRequestController.js';

const router = express.Router();

// Ruta para crear una nueva solicitud de servicio
router.post('/', ServiceRequestController.createServiceRequest)

export default router