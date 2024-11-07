import React from 'react';
import './CategorySelection.css'
import { products } from '../../utils/productsData'
import NewTag from '../NewTag/NewTag'

// Lista de IDs de categorías con NEW TAG
const newCategoryIds = [1, 17, 18]

const CategorySelection = ({ nextStep, updateFormData}) => {
  const handleCategorySelect = (category) => {
    updateFormData('category', {id: category.id, name: category.name})
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
            {newCategoryIds.includes(category.id) && (
              <NewTag text="Nuevo" color="var(--green-color)" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySelection
