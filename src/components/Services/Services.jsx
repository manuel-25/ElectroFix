import React, { useState } from 'react'
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
    setFormData({ ...formData, [key]: value });
  }

  return (
    <div className="services">
      <ProgressBar step={step} />

      {step === 1 && <CategorySelection nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && <BrandSelection selectedCategory={formData.category} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 3 && <ModelSelection selectedCategory={formData.category} brand={formData.brand} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 4 && <FaultSelection selectedCategory={formData.category} formData={formData}  nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData}/>}
      {step === 5 && <InformationForm nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 6 && console.log(formData)}
    </div>
  )
}

export default Services
