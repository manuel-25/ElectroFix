import express from 'express'
import { logger } from '../utils/logger.js'

const router = express.Router()

// Recibir logs desde el frontend
router.post('/', (req, res) => {
  try {
    const { level = 'error', message } = req.body

    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }

    // Registrar log con Winston
    logger.log(level, `[FRONTEND] ${message}`)

    return res.status(200).json({ success: true })
  } catch (error) {
    logger.error(`Error en logRoutes: ${error.message}`)
    return res.status(500).json({ error: "Error interno en logRoutes" })
  }
})

router.get('/ping', (req, res) => {
  res.json({ msg: 'Logs OK' })
})

export default router
