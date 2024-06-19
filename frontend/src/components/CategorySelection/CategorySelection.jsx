import React from 'react'
import './CategorySelection.css'
import { products } from '../../utils/productsData'

const CategorySelection = ({ nextStep, updateFormData }) => {
  const handleCategorySelect = (id) => {
    updateFormData('category', id)
    nextStep()
  }

  return (
    <div className="selection-container">
      <h3>¿Qué necesita reparación?</h3>
      <div className="selection-list">
        {products.map(category => (
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
