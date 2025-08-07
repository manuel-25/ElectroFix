import ServiceModel from '../Mongo/models/service.model.js'
import ClientManager from '../Mongo/ClientManager.js'
import NumberGenerator from '../services/numberGenerator.js'
import { logger } from '../utils/logger.js'

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
        serviceType, serviceValue, abono, repuestos, branch,
        quoteReference, photos, receivedBy, lastModifiedBy,
        internalNotes, code
      } = req.body

      if (!userData || !userData.email || !userData.phone) {
        return res.status(400).json({ error: 'Datos de cliente incompletos' })
      }

      // Verificar existencia del cliente
      const existingClient = await ClientManager.findByEmail(userData.email)
      if (!existingClient) {
        return res.status(404).json({ error: 'Cliente no encontrado' })
      }

      // Verificar si el código ya existe
      const existingService = await ServiceModel.findOne({ code })
      if (existingService) {
        return res.status(400).json({ error: 'Ya existe un servicio con este código' })
      }

      // Crear el nuevo servicio
      const newService = await ServiceModel.create({
        customerNumber: existingClient.customerNumber,
        quoteReference,
        code,
        branch,
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
        approximateValue: serviceValue,
        finalValue: abono,
        repuestos,
        status: 'Pendiente',
        statusHistory: [{
          status: 'Recibido',
          changedBy: req.user._id
        }],
        createdBy: req.user._id,
        receivedBy: receivedBy || 'Web',
        lastModifiedBy: req.user._id || 'Sistema',
        warrantyExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        photos,
        notes: internalNotes || ''
      })

      res.status(201).json(newService)
    } catch (err) {
      logger.error('Error al crear servicio', err)
      res.status(500).json({ error: 'Error al crear servicio' })
    }
  }

  // ✅ getLastCode
  static async getLastCode(req, res) {
    const { branch } = req.params;

    if (!branch) {
      return res.status(400).json({ error: 'Sucursal no especificada' });
    }

    try {
      // Buscar el servicio más reciente con ese branch, ordenando por código descendente
      const last = await ServiceModel.findOne({ branch }).sort({ code: -1 }).select('code');
      let nextCode;

      if (last && last.code) {
        // Extraer el número secuencial del código: asumiendo formato 'Q001', 'Web1002'
        const num = parseInt(last.code.replace(branch, ''), 10);
        nextCode = branch + (num + 1);
      } else {
        nextCode = branch + '1000';
      }

      return res.json({ nextCode });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener último código' });
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
      const updated = await ServiceModel.findOneAndUpdate(
        { code: req.params.code },
        {
          ...req.body,
          lastModifiedBy: req.body.lastModifiedBy || 'Desconocido',
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
