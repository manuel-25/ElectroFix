import express from 'express'
import QuoteManager from '../Mongo/QuoteManager.js';

const router = express.Router()

// Crear una nueva solicitud de servicio
router.post('/', async (req, res) => {
    try {
      const serviceRequest = await QuoteManager.create(req.body)
      res.status(201).send(serviceRequest)
    } catch (error) {
      res.status(400).send(error)
    }
})

export default router