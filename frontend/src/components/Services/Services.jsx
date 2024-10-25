import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../../utils/productsData'
import './Services.css'

// Importar los subcomponentes
import CategorySelection from '../CategorySelection/CategorySelection'
import BrandSelection from '../BrandSelection/BrandSelection'
import ModelSelection from '../ModelSelection/ModelSelection'
import FaultSelection from '../FaultSelection/FaultSelection'
import InformationForm from '../InformationForm/InformationForm'
import FormSubmissionStatus from '../FormSubmissionStatus/FormSubmissionStatus'
import ProgressBar from '../ProgressBar/ProgressBar'

const Services = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [step, setStep] = useState(1) // Paso inicial
  const [formData, setFormData] = useState({
    date: '',
    category: { id: '', name: '' },
    brand: '',
    model: '',
    faults: '',
    userData: {
      customerNumber: '',
      serviceRequestNumber: '',
      firstName: ''
    }
  })
  const [submitStatus, setSubmitStatus] = useState('pending') // Estado del envío
  const [responseData, setResponseData] = useState(null) // Almacena la respuesta del servidor

  // Obtener parámetros de consulta
  const selectedCategory = queryParams.get('category') || null
  const selectedBrand = queryParams.get('brand') || null
  const selectedModel = queryParams.get('model') || null

  // Verificar si la categoría seleccionada es válida
  const isValidCategory = products.some(product => product.name === selectedCategory)
  const validCategory = isValidCategory ? selectedCategory : null

  // Buscar la categoría en el array de productos
  const selectedProduct = validCategory ? products.find(product => product.name === validCategory) : null

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prevState => ({
        ...prevState,
        category: {
          id: selectedProduct.id,
          name: selectedProduct.name
        }
      }))
      setStep(2)
    }
  }, [selectedProduct])

  useEffect(() => {
    if (selectedBrand) {
      updateFormData('brand', selectedBrand) // Actualizar marca en formData
    }
  }, [selectedBrand])

  useEffect(() => {
    // Navegación a través de pasos basada en los datos disponibles
    if (selectedBrand && selectedModel) {
      setStep(4)
    } else if (selectedBrand) {
      setStep(3)
    } else if (validCategory) {
      setStep(2)
    }
  }, [validCategory, selectedBrand, selectedModel])

  const updateFormData = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleSubmit = async () => {
    const date = new Date(new Date().getTime() - (3 * 60 * 60 * 1000)) // Ajustar la fecha
    const updatedFormData = { ...formData, date }

    try {
      const response = await fetch('http://localhost:8000/api/service-requests', {     //https://electrosafeweb.com/api/service-requests
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      })
      const responseData = await response.json()

      if (!response.ok) {
        console.error('Form submission failed', responseData)
        setSubmitStatus('error')
        return
      }

      setResponseData(responseData) // Almacenar la respuesta del servidor
      setFormData(prevState => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          customerNumber: responseData.customerNumber,
          serviceRequestNumber: responseData.serviceRequestNumber,
          firstName: updatedFormData.userData.firstName // Asegúrate de que este dato esté presente
        }
      }))
      setSubmitStatus('success')
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    }
  }

  useEffect(() => {
    if (step === 6) {
      handleSubmit()
    }
  }, [step])

  const nextStep = () => setStep(prevStep => prevStep + 1)
  const prevStep = () => setStep(prevStep => prevStep - 1)

  return (
    <div className="services">
      <ProgressBar step={step} prevStep={prevStep} />

      {step === 1 && <CategorySelection nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && (
        <BrandSelection
          selectedCategory={formData.category}
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && (
        <ModelSelection
          selectedCategory={formData.category}
          brand={formData.brand}
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
        />
      )}
      {step === 4 && (
        <FaultSelection
          selectedCategory={formData.category}
          formData={formData}
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
        />
      )}
      {step === 5 && (
        <InformationForm 
          nextStep={nextStep} 
          prevStep={prevStep} 
          updateFormData={updateFormData} 
        />
      )}
      {step === 6 && (
        <FormSubmissionStatus 
          status={submitStatus} 
          name={formData.userData.firstName} 
          customerNumber={formData.userData.customerNumber} 
          serviceRequestNumber={formData.userData.serviceRequestNumber} 
        />
      )}
    </div>
  )
}

export default Services
