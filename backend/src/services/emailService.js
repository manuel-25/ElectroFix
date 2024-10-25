import nodemailer from 'nodemailer'
import config from '../utils/config.js'
import { logger } from '../utils/logger.js'

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: config.BREVO_USER,
    pass: config.BREVO_PASS
  }
})

// Verificar la conexión del servidor SMTP
const verifyConnection = async () => {
  try {
    await transporter.verify()
    logger.info("Servidor listo para enviar correos")
  } catch (error) {
    logger.error("Error verificando la conexión SMTP:", error)
  }
}

verifyConnection()

// Función para enviar correos electrónicos
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: config.GMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    logger.info('Correo enviado: ', info.response)

    return info
  } catch (error) {
    logger.fatal('Error enviando correo:', error)
    throw new Error('Fallo al enviar el correo')
  }
}
