// src/services/NumberGenerator.js
import QuoteManager from '../Mongo/QuoteManager.js'
import ClientManager from '../Mongo/ClientManager.js'

class NumberGenerator {
    static async generateServiceRequestNumber() {
        try {
            const lastServiceRequest = await QuoteManager.findLastServiceRequest()
            const serviceRequestNumber = lastServiceRequest && lastServiceRequest?.serviceRequestNumber
                ? lastServiceRequest.serviceRequestNumber + 1
                : 10081
            return serviceRequestNumber
        } catch (error) {
            throw new Error('Error generating service request number')
        }
    }

    static async generateCustomerNumber() {
        try {
            const lastClient = await ClientManager.findLastClient()
            const customerNumber = lastClient && lastClient.customerNumber
                ? lastClient.customerNumber + 1
                : 10077
            return customerNumber
        } catch (error) {
            throw new Error('Error generating customer number')
        }
    }
}

export default NumberGenerator
