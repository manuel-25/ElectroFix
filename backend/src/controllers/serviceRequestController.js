import QuoteManager from '../Mongo/QuoteManager.js'
import ClientManager from '../Mongo/ClientManager.js'
import { sendEmail } from '../services/emailService.js'
import config from '../utils/config.js'
import NumberGenerator from '../services/numberGenerator.js'
import { logger } from '../utils/logger.js'

function normalizeName(name) {
    if(!name) return
    return name
        .toLowerCase()                        // Convertir todo el texto a minúsculas
        .split(' ')                           // Separar por espacios
        .filter(word => word.trim() !== '')    // Eliminar espacios vacíos
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Poner la primera letra en mayúscula
        .join(' ')                           // Unir las palabras normalizadas de nuevo
}

class ServiceRequestController {
    // Método para crear una nueva solicitud de servicio
    static async createServiceRequest(req, res, next) {
        try {
            // Normalizar los datos del cliente antes de guardarlos
            let { userData, category, brand, model, faults, details } = req.body

            // Normalizar el nombre y el apellido
            userData.firstName = normalizeName(userData.firstName)
            userData.lastName = normalizeName(userData.lastName)
            model = model.trim()

            // Ajustar la fecha
            const { date } = req.body
            const adjustedDate = new Date(date)
            adjustedDate.setHours(adjustedDate.getHours() + 3)
            req.body.date = adjustedDate

            // Verificar si el cliente ya existe por email
            const existingClient = await ClientManager.findByEmail(userData.email)
            
            let customerNumber
            let serviceRequestNumber = await NumberGenerator.generateServiceRequestNumber()

            if (existingClient) {
                // Cliente existente: reutilizar el número de cliente
                customerNumber = existingClient.customerNumber
                // Agregar el nuevo número de solicitud al cliente existente
                existingClient.serviceRequestNumbers.push(serviceRequestNumber)
            } else {
                // Cliente nuevo: generar un nuevo número de cliente
                customerNumber = await NumberGenerator.generateCustomerNumber()

                // Crear un nuevo cliente con el customerNumber y la solicitud
                const newClientData = {
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    province: userData.province,
                    municipio: userData.municipio,
                    serviceRequestNumbers: [serviceRequestNumber],
                    customerNumber: customerNumber
                }
                await ClientManager.create(newClientData)
            }

            // Asignar los números generados a la solicitud
            req.body.customerNumber = customerNumber
            req.body.serviceRequestNumber = serviceRequestNumber

            // Convertir `details` en una cadena JSON antes de almacenar
            if (typeof details === 'object') {
                req.body.details = JSON.stringify(details)
            }

            // Crear la solicitud en la base de datos
            const serviceRequest = await QuoteManager.create(req.body)

            const emailContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #F5F7FA; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <h2 style="background-color: #70757A; color: white; padding: 10px; text-align: center; border-radius: 10px 10px 0 0;">Nueva Solicitud de Servicio</h2>
                    <div style="background-color: white; padding: 20px; border-radius: 0 0 10px 10px;">
                        <p><strong>Fecha:</strong> ${req.body.date.toLocaleString()}</p>
                        <p><strong>Número de Cliente:</strong> ${customerNumber}</p>
                        <p><strong>Número de Solicitud:</strong> ${serviceRequestNumber}</p>
                        <p><strong>Equipo:</strong> ${category.name}</p>
                        <p><strong>Detalles:</strong> ${details}</p>
                        <p><strong>Marca:</strong> ${brand}</p>
                        <p><strong>Modelo:</strong> ${model}</p>
                        <p><strong>Fallas reportadas:</strong></p>
                        <ul style="background-color: #F9F9F9; padding: 10px; border-radius: 5px; list-style-type: none; padding-left: 0;">
                            ${faults.map(fault => `<li style="border-bottom: 1px solid #eee; padding: 5px 0;">${fault}</li>`).join('')}
                        </ul>
                        <p><strong>Detalles adicionales:</strong> ${userData.additionalDetails || 'N/A'}</p>
                        <h3 style="color: #70757A;">Datos del usuario:</h3>
                        <p><strong>Nombre:</strong> ${userData.firstName} ${userData.lastName}</p>
                        <p><strong>Email:</strong> ${userData.email}</p>
                        <p><strong>Teléfono:</strong> +54 9 ${userData.phone}</p>
                        <p><strong>Provincia:</strong> ${userData.province}</p>
                        <p><strong>Municipio:</strong> ${userData.municipio}</p>
                        <p><strong>Código de descuento:</strong> ${userData.discountCode || 'N/A'}</p>
                        <p style="text-align: center; margin-top: 20px;">
                            <a href="https://wa.me/549${userData.phone}?text=Hola, ${userData.firstName}! Nos comunicamos del equipo de logística Electrosafe, recibimos tu solicitud de cotización (Nº ${serviceRequestNumber}) en nuestra web y quería comentarte las opciones y promociones que tenemos para reparación de tu ${category.name}."
                                style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Contactar por WhatsApp
                            </a>
                        </p>
                    </div>
                </div>
            `

            // Verificar que el destinatario del correo esté configurado
            const recipientEmail = config.GMAIL_USER
            if (!recipientEmail) {
                throw new Error('No recipient email defined')
            }

            // Enviar correo electrónico
            await sendEmail(
                config.GMAIL_USER,
                'Nueva solicitud de cotización',
                emailContent
            )

            // Devolver la respuesta exitosa
            res.status(201).send(serviceRequest)
        } catch (error) {
            logger.fatal('Error creating service request:', error)
            res.status(400).send({ error: error.message, stack: error.stack })
        }
    }
}

export default ServiceRequestController
