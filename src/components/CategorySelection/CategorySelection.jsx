import React from 'react'
import './CategorySelection.css'


const CategorySelection = ({ nextStep, updateFormData }) => {
  const categories = [
    { id: 1, name: 'Smartphone' },
    { id: 2, name: 'Consola' },
    { id: 3, name: 'Televisor' },
    { id: 4, name: 'Horno Eléctrico' },
    { id: 5, name: 'Cafetera' },
    { id: 6, name: 'Pava Eléctrica' },
    { id: 7, name: 'Tostadora' },
    { id: 8, name: 'Plancha' },
    { id: 9, name: 'Secadora de Pelo' },
    { id: 10, name: 'Planchita de Pelo' },
    { id: 11, name: 'Notebook' },
    { id: 12, name: 'Cava de Vino' },
    { id: 13, name: 'Ventilador' },
    { id: 14, name: 'Estufa' }
  ]

  const handleCategorySelect = (id) => {
    updateFormData('category', id)
    nextStep()
  }

  return (
    <div className="selection-container">
      <h2>¿Qué necesita reparación?</h2>
      <div className="selection-list">
        {categories.map(category => (
          <div
            key={category.id}
            className="selection-item"
            onClick={() => handleCategorySelect(category)}
          >
            {/* <img src={iconPath} alt={category.name} className="category-icon" /> */}
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySelection
