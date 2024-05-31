import React, { useState, useEffect } from 'react'
import './Services.css'

// Importar los subcomponentes
import CategorySelection from '../CategorySelection/CategorySelection'
import BrandSelection from '../BrandSelection/BrandSelection'
import ModelSelection from '../ModelSelection/ModelSelection'
import FaultSelection from '../FaultSelection/FaultSelection'
import InformationForm from '../InformationForm/InformationForm'
import ProgressBar from '../ProgressBar/ProgressBar'

const Services = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    brand: '',
    model: '',
    faults: '',
    userData: {}
  })

  // Función para manejar el cambio de etapa
  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  // Función para actualizar los datos del formulario
  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  // Función para manejar el envío de datos
  const handleSubmit = async () => {
    try {
      const date = new Date(new Date().getTime() - (3 * 60 * 60 * 1000))
      const updatedFormData = { ...formData, date }
      const response = await fetch('http://localhost:5000/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      })

      if (response.ok) {
        console.log('response', await response.json())
        console.log('Form submitted successfully!')
        // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
      } else {
        console.error('Form submission failed')
        // Manejo de errores aquí
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // Usar useEffect para llamar handleSubmit cuando el paso es 6
  useEffect(() => {
    if (step === 6) {
      handleSubmit()
    }
  }, [step])

  return (
    <div className="services">
      <ProgressBar step={step} prevStep={prevStep} />

      {step === 1 && <CategorySelection nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && <BrandSelection selectedCategory={formData.category} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 3 && <ModelSelection selectedCategory={formData.category} brand={formData.brand} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 4 && <FaultSelection selectedCategory={formData.category} formData={formData} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 5 && <InformationForm nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 6 && <div>Submitting your form...</div>}
    </div>
  )
}

export default Services
