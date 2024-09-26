import QuoteManager from '../Mongo/QuoteManager.js'
import ClientManager from '../Mongo/ClientManager.js'
import { sendEmail } from '../services/emailService.js'
import config from '../utils/config.js'
import NumberGenerator from '../services/numberGenerator.js'

class ServiceRequestController {
    // Método para crear una nueva solicitud de servicio
    static async createServiceRequest(req, res) {
        try {
            // Ajustar la fecha
            const { date } = req.body
            const adjustedDate = new Date(date)
            adjustedDate.setHours(adjustedDate.getHours() + 3)
            req.body.date = adjustedDate

            // Verificar si el cliente ya existe por email
            const existingClient = await ClientManager.findByEmail(req.body.userData.email)
            
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
                    email: req.body.userData.email,
                    firstName: req.body.userData.firstName,
                    lastName: req.body.userData.lastName,
                    phone: req.body.userData.phone,
                    province: req.body.userData.province,
                    municipio: req.body.userData.municipio,
                    serviceRequestNumbers: [serviceRequestNumber],
                    customerNumber: customerNumber
                }
                await ClientManager.create(newClientData)
            }

            // Asignar los números generados a la solicitud
            req.body.customerNumber = customerNumber
            req.body.serviceRequestNumber = serviceRequestNumber

            // Crear la solicitud en la base de datos
            const serviceRequest = await QuoteManager.create(req.body)

            // Formatear el contenido del correo
            const { category, brand, model, faults, userData } = req.body
            const emailContent = `
                <div style="font-family: Arial, sans-serif max-width: 600px margin: auto background-color: #F5F7FA padding: 20px border-radius: 10px box-shadow: 0 0 10px rgba(0,0,0,0.1)">
                    <h2 style="background-color: #70757A color: white padding: 10px text-align: center border-radius: 10px 10px 0 0">Nueva Solicitud de Servicio</h2>
                    <div style="background-color: white padding: 20px border-radius: 0 0 10px 10px">
                        <p><b>Fecha:</b> ${req.body.date.toLocaleString()}</p>
                        <p><b>Equipo:</b> ${category.name}</p>
                        <p><b>Marca:</b> ${brand}</p>
                        <p><b>Modelo:</b> ${model}</p>
                        <p><b>Fallas reportadas:</b></p>
                        <ul style="background-color: #F9F9F9 padding: 10px border-radius: 5px list-style-type: none padding-left: 0">
                            ${faults.map(fault => `<li style="border-bottom: 1px solid #eee padding: 5px 0">${fault}</li>`).join('')}
                        </ul>
                        <p><b>Detalles adicionales:</b> ${userData.additionalDetails || 'N/A'}</p>
                        <h3>Datos del usuario:</h3>
                        <p><b>Nombre:</b> ${userData.firstName} ${userData.lastName}</p>
                        <p><b>Email:</b> ${userData.email}</p>
                        <p><b>Teléfono:</b> +54 9 ${userData.phone}</p>
                        <p><b>Provincia:</b> ${userData.province}</p>
                        <p><b>Municipio:</b> ${userData.municipio}</p>
                        <p><b>Código de descuento:</b> ${userData.discountCode || 'N/A'}</p>
                        <p style="text-align: center margin-top: 20px">
                            <a href="https://wa.me/549${userData.phone}?text=Hola, ${userData.firstName}! Nos comunicamos del equipo de logística Electrosafe, recibimos tu solicitud de cotización en nuestra web y quería comentarte las opciones y promociones que tenemos para reparación de tu ${category.name}." 
                                style="background-color: #25D366 color: white padding: 10px 20px text-decoration: none border-radius: 5px display: inline-block">
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
            console.error('Error creating service request:', error)
            res.status(400).send({ error: error.message, stack: error.stack })
        }
    }


}

export default ServiceRequestController
