import React from 'react';
import './CategorySelection.css'
import { products } from '../../utils/productsData'
import NewTag from '../NewTag/NewTag'
import { newCategoryIds } from '../../utils/productsData'
import { discountCategoryIds } from '../../utils/productsData';

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
            {discountCategoryIds.includes(category.id) && (
              <NewTag text="-10%" color="var(--primary-color)" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySelection
