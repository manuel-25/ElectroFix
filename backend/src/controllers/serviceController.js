import ServiceModel from '../Mongo/models/service.model.js'
import ClientManager from '../Mongo/ClientManager.js'
import NumberGenerator from '../services/numberGenerator.js'
import { logger } from '../utils/logger.js'

const VALID_PREFIX = ['Q','B','W']

class ServiceController {
  // ✅ getAllServices
  static async getAllServices(req, res) {
    try {
      const services = await ServiceModel.find()
      res.status(200).json(services)
    } catch (err) {
      logger.error('Error al obtener servicios', err)
      res.status(500).json({ error: 'Error al obtener los servicios' })
    }
  }

  // ✅ getServiceById
  static async getServiceById(req, res) {
    try {
      const service = await ServiceModel.findById(req.params.id)
      if (!service) return res.status(404).json({ error: 'Servicio no encontrado' })
      res.status(200).json(service)
    } catch (err) {
      logger.error('Error al obtener el servicio', err)
      res.status(500).json({ error: 'Error al obtener el servicio' })
    }
  }

  // ✅ getServiceByCode
  static async getServiceByCode(req, res) {
    try {
      const service = await ServiceModel.findOne({ code: req.params.code })
      if (!service) return res.status(404).json({ error: 'Servicio no encontrado por código' })
      res.status(200).json(service)
    } catch (err) {
      logger.error('Error al buscar servicio por código', err)
      res.status(500).json({ error: 'Error al buscar servicio por código' })
    }
  }

  // ✅ getServicesByCustomerNumber
  static async getServicesByCustomerNumber(req, res) {
    try {
      const services = await ServiceModel.find({ customerNumber: req.params.customerNumber })
      res.status(200).json(services)
    } catch (err) {
      logger.error('Error al buscar servicios por número de cliente', err)
      res.status(500).json({ error: 'Error al buscar servicios por número de cliente' })
    }
  }

  // ✅ getServicesByQuoteReference
  static async getServicesByQuoteReference(req, res) {
    try {
      const services = await ServiceModel.find({ quoteReference: req.params.quoteReference })
      res.status(200).json(services)
    } catch (err) {
      logger.error('Error al buscar servicios por referencia de cotización', err)
      res.status(500).json({ error: 'Error al buscar servicios por referencia de cotización' })
    }
  }

  // ✅ createService
  static async createService(req, res) {
    try {
      const {
        userData, equipmentType, description, brand, model,
        serviceType, approximateValue, finalValue, repuestos,
        quoteReference, photos, receivedAtBranch,
        deliveryMethod, receivedNotes, receivedPhoto,
        notes, code
      } = req.body

      if (!userData?.email || !userData?.phone) {
        return res.status(400).json({ error: 'Datos de cliente incompletos' })
      }

      const existingClient = await ClientManager.findByEmail(userData.email)
      if (!existingClient) return res.status(404).json({ error: 'Cliente no encontrado' })

      const exists = await ServiceModel.findOne({ code })
      if (exists) return res.status(400).json({ error: 'Ya existe un servicio con este código' })

      const isReceived = !!receivedAtBranch
      const initialStatus = isReceived ? 'Recibido' : 'Pendiente'

      const newServiceData = {
        customerNumber: existingClient.customerNumber,
        quoteReference,
        code,

        userData: {
          ...userData,
          province: existingClient.province,
          municipio: existingClient.municipio
        },

        equipmentType,
        description,
        brand,
        model,
        serviceType,
        approximateValue,
        finalValue: Number(finalValue) || 0,
        repuestos: Number(repuestos) || 0,

        status: initialStatus,
        statusHistory: [{
          status: initialStatus,
          changedBy: req.user.email,
          changedAt: new Date()
        }],

        createdBy: req.user._id,
        createdByEmail: req.user.email,

        receivedBy: isReceived ? req.user.email : null,
        receivedAtBranch: isReceived ? receivedAtBranch : null,
        receivedAt: isReceived ? new Date() : null,
        deliveryMethod: deliveryMethod || 'Presencial',
        receivedNotes: isReceived ? receivedNotes : null,
        receivedPhoto: isReceived ? receivedPhoto : null,

        lastModifiedBy: req.user.email || 'No definido',
        warrantyExpiration: Number(req.body.warrantyExpiration ?? 30),
        photos,
        notes: notes || ''
      }

      const newService = await ServiceModel.create(newServiceData)
      res.status(201).json(newService)
    } catch (err) {
      console.error('❌ Error al crear servicio:', err)
      res.status(500).json({ error: 'Error al crear servicio', details: err.message })
    }
  }

  // ✅ getLastCode
  static async getLastCode(req, res) {
    try {
      const { prefix } = req.params
      if (!VALID_PREFIX.includes(prefix)) {
        return res.status(400).json({ error: 'Prefijo inválido' })
      }

      // Busca códigos que empiecen por el prefijo y extrae el sufijo numérico
      const [{ num } = {}] = await ServiceModel.aggregate([
        { $match: { code: { $regex: `^${prefix}\\d+$` } } },
        {
          $project: {
            num: {
              $toInt: {
                $substrCP: ['$code', 1, { $subtract: [{ $strLenCP: '$code' }, 1] }]
              }
            }
          }
        },
        { $sort: { num: -1 } },
        { $limit: 1 }
      ])

      const next = (num || 1000) + 1
      return res.json({ nextCode: `${prefix}${next}` })
    } catch (err) {
      console.error('getLastCode error:', err)
      return res.status(500).json({ error: 'Error al obtener el siguiente código' })
    }
  }

  // ✅ updateServiceById
  static async updateServiceById(req, res) {
    try {
      const updated = await ServiceModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          lastModifiedBy: req.body.lastModifiedBy || 'Desconocido',
          lastModifiedAt: new Date()
        },
        { new: true }
      )
      res.status(200).json(updated)
    } catch (err) {
      logger.error('Error al actualizar el servicio', err)
      res.status(500).json({ error: 'Error al actualizar el servicio' })
    }
  }

  // ✅ updateServiceByCode
  static async updateServiceByCode(req, res) {
    try {
      if (req.body.code) {
        const existing = await ServiceModel.findOne({ code: req.body.code })
        if (existing && existing.code !== req.params.code) {
          return res.status(400).json({ error: 'El código ya está en uso por otro servicio' })
        }
      }
      const updated = await ServiceModel.findOneAndUpdate(
        { code: req.params.code },
        {
          ...req.body,
          lastModifiedBy: req.body.lastModifiedBy || '-',
          lastModifiedAt: new Date()
        },
        { new: true }
      )
      res.status(200).json(updated)
    } catch (err) {
      logger.error('Error al actualizar el servicio por código', err)
      res.status(500).json({ error: 'Error al actualizar el servicio por código' })
    }
  }

  // ✅ updateServiceStatus (reemplazar)
  static async updateServiceStatus(req, res) {
    const { id } = req.params
    const {
      status,
      receivedBy,
      note,
      receivedAtBranch,
      deliveredAt,
      isSatisfied
    } = req.body

    try {
      const now = new Date()

      const updatePayload = {
        status,
        lastModifiedBy: req.user.email,
        lastModifiedAt: now,
        ...(receivedBy && { receivedBy }),
        ...(note && { notes: note }),

        // Recibido
        ...(status === 'Recibido' && receivedAtBranch && { receivedAtBranch }),
        ...(status === 'Recibido' && { receivedAt: now }),

        // Entregado
        ...(status === 'Entregado' && { deliveredAt: deliveredAt || now }),
        ...(status === 'Entregado' && typeof isSatisfied === 'boolean' && { isSatisfied })
      }

      const updated = await ServiceModel.findByIdAndUpdate(
        id,
        {
          $set: updatePayload,
          $push: {
            statusHistory: {
              status,
              changedBy: req.user.email,
              changedAt: now,
              ...(note && { note })
            }
          }
        },
        { new: true, runValidators: true }
      )

      if (!updated) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
      }

      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar servicio', details: err.message })
    }
  }

  // ✅ deleteService
  static async deleteService(req, res) {
    try {
      const deleted = await ServiceModel.findByIdAndDelete(req.params.id)
      res.status(200).json(deleted)
    } catch (err) {
      logger.error('Error al eliminar servicio', err)
      res.status(500).json({ error: 'Error al eliminar el servicio' })
    }
  }

  // ✅ softDeleteByCode (opcional)
  static async softDeleteByCode(req, res) {
    try {
      const updated = await ServiceModel.findOneAndUpdate(
        { code: req.params.code },
        { status: 'Eliminado' },
        { new: true }
      )
      res.status(200).json(updated)
    } catch (err) {
      logger.error('Error al hacer soft delete', err)
      res.status(500).json({ error: 'Error al eliminar lógicamente el servicio' })
    }
  }
}

export default ServiceController
