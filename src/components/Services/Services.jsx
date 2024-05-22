import React, { useState } from 'react';
import './Services.css';

// Importar los subcomponentes
import CategorySelection from '../CategorySelection/CategorySelection';
import BrandSelection from '../BrandSelection/BrandSelection';
import ModelSelection from '../ModelSelection/ModelSelection';
import FaultSelection from '../FaultSelection/FaultSelection';
import InformationForm from '../InformationForm/InformationForm';
import ProgressBar from '../ProgressBar/ProgressBar';

const Services = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    fault: '',
    // Nuevos campos agregados para los datos del cliente
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    discountCode: ''
  });

  // Función para manejar el cambio de etapa
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Función para actualizar los datos del formulario
  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="services">
      <ProgressBar step={step} />

      {step === 1 && <CategorySelection nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && <BrandSelection selectedCategory={formData.category} nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 3 && <ModelSelection nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 4 && <FaultSelection nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
      {step === 5 && <InformationForm nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
    </div>
  );
};

export default Services;
