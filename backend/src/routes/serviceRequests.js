import express from 'express'
import QuoteManager from '../Mongo/QuoteManager.js'
import { sendEmail } from '../services/emailService.js'
import config from '../utils/config.js'

const router = express.Router()

// Crear una nueva solicitud de servicio
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const serviceRequest = await QuoteManager.create(req.body)

    // Formatear los datos del request body para el correo electrónico
    const { date, category, brand, model, faults, userData } = req.body
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #F5F7FA; padding: 20px; border-radius: 10px;">
        <h2 style="background-color: #70757A; color: white; padding: 10px; text-align: center; border-radius: 10px 10px 0 0;">Nueva Solicitud de Servicio</h2>
        
        <p><b>Fecha:</b> ${new Date(date).toLocaleString()}</p>
        <p><b>Equipo:</b> ${category.name}</p>
        <p><b>Marca:</b> ${brand}</p>
        <p><b>Modelo:</b> ${model}</p>
        <p><b>Fallas reportadas:</b></p>
        <ul style="background-color: white; padding: 10px; border-radius: 5px;">
          ${faults.map(fault => `<li>${fault}</li>`).join('')}
        </ul>
        <p><b>Detalles adicionales:</b> ${userData.additionalDetails || 'N/A'}</p>
        
        <h3>Datos del usuario:</h3>
        <p><b>Nombre:</b> ${userData.firstName} ${userData.lastName}</p>
        <p><b>Email:</b> ${userData.email}</p>
        <p><b>Teléfono:</b>+54 9 ${userData.phone}</p>
        <p><b>Provincia:</b> ${userData.province}</p>
        <p><b>Municipio:</b> ${userData.municipio}</p>
        <p><b>Código de descuento:</b> ${userData.discountCode || 'N/A'}</p>
        
        <p style="text-align: center;">
          <a href="https://wa.me/${userData.phone}?text=Hola, ${userData.firstName}! te escribo desde Electrosafe ví tu cotizacioón en nuestra web y quería comentarte las opciones y promociones que tenemos para reparación de tu ${category.name}." 
             style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">
            Contactar por WhatsApp
          </a>
        </p>
      </div>
    `

    // Verifica que el destinatario esté definido
    const recipientEmail = "electrosafeservice@gmail.com" //config.GMAIL_USER;  // O el correo electrónico que desees usar
    if (!recipientEmail) {
      throw new Error('No recipient email defined');
    }

    // Enviar correo electrónicocd
    const email = await sendEmail(
      "electrosafeservice@gmail.com",
      'Nueva solicitud de cotización',
      emailContent
    )
    console.log(email)

    res.status(201).send(serviceRequest)
  } catch (error) {
    console.error('Error creating service request:', error);

    // Envía la información completa del error en la respuesta
    res.status(400).send({ error: error.message, stack: error.stack });
  }
})

export default router
