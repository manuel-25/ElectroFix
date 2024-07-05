import nodemailer from 'nodemailer'
import config from '../utils/config.js'

console.log('USER:', process.env.BREVO_USER)
console.log('PASS:', process.env.BREVO_PASS)

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: "MS_azGhid@trial-pq3enl6dzkrg2vwr.mlsender.net",
    pass: "XPLKZCSVfVNnkvix"
  }
})

// Verificar la conexión del servidor SMTP
const verifyConnection = async () => {
  try {
    await transporter.verify()
    console.log("Servidor listo para enviar correos")
  } catch (error) {
    console.error("Error verificando la conexión SMTP:", error)
  }
}

verifyConnection()

// Función para enviar correos electrónicos
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: "MS_azGhid@trial-pq3enl6dzkrg2vwr.mlsender.net",
      to: to,
      subject: subject,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Correo enviado: ', info.response)

    return info
  } catch (error) {
    console.error('Error enviando correo:', error)
    throw new Error('Fallo al enviar el correo')
  }
}
