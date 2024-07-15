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
  let selectedCategory = queryParams.get('category') || null
  let selectedBrand = queryParams.get('brand') || null
  let selectedModel = queryParams.get('model') || null

  // Verificar si la categoría seleccionada está en la lista de productos
  const isValidCategory = products.some(product => product.name === selectedCategory)

  // Si la categoría seleccionada no es válida, establecerla como null
  if (!isValidCategory) {
    selectedCategory = null
  }

  // Buscar la categoría seleccionada en el array de productos
  const selectedProduct = selectedCategory ? products.find(product => product.name === selectedCategory) : null

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prevState => ({
        ...prevState,
        category: {
          id: selectedProduct.id,
          name: selectedProduct.name
        }
      }))
      setStep(2) // Avanzar automáticamente al paso 2 si tenemos la categoría seleccionada
    }
  }, [selectedProduct])

  const [step, setStep] = useState(1) // Comenzar en el paso 1 por defecto
  const [formData, setFormData] = useState({
    date: '',
    category: selectedProduct ? { id: selectedProduct.id, name: selectedProduct.name } : '',
    brand: selectedBrand || '',
    model: selectedModel || '',
    faults: '',
    userData: {}
  })

  const [submitStatus, setSubmitStatus] = useState('pending') // 'pending', 'success', 'error'

  // Función para manejar el cambio de etapa
  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  // Función para actualizar los datos del formulario
  const updateFormData = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  // Función para manejar el envío de datos
  const handleSubmit = () => {
    const submitData = async () => {
      try {
        const date = new Date(new Date().getTime() - (3 * 60 * 60 * 1000))
        const updatedFormData = { ...formData, date }
        const response = await fetch('https://electrosafeweb.com/api/service-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        })

        const responseData = await response.json()

        if (response.ok) {
          console.log('Form submitted successfully!')
          setSubmitStatus('success')
        } else {
          console.error('Form submission failed', responseData)
          setSubmitStatus('error')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        setSubmitStatus('error')
      }
    }

    setSubmitStatus('pending')
    submitData()
  }

  // Usar useEffect para llamar handleSubmit cuando el paso es 6
  useEffect(() => {
    if (step === 6) {
      handleSubmit()
    }
  }, [step])

  // Determinar el paso inicial basado en la disponibilidad de datos
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      setStep(4)
    } else if (selectedBrand) {
      setStep(3)
    } else if (selectedCategory) {
      setStep(2)
    }
  }, [selectedCategory, selectedBrand, selectedModel])

  return (
    <div className="services">
      <ProgressBar step={step} prevStep={prevStep} />

      {step === 1 && <CategorySelection nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && <BrandSelection selectedCategory={formData.category} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 3 && <ModelSelection selectedCategory={formData.category} brand={formData.brand} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 4 && <FaultSelection selectedCategory={formData.category} formData={formData} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 5 && <InformationForm nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 6 && <FormSubmissionStatus status={submitStatus} name={formData.userData.firstName} />}
    </div>
  )
}

export default Services
