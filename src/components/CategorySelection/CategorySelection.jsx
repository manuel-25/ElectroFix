import React from 'react';
import './CategorySelection.css';

const CategorySelection = ({ nextStep, updateFormData }) => {
  const categories = [
    { id: 1, name: 'Smartphones' },
    { id: 2, name: 'Consolas' },
    { id: 3, name: 'Televisores' },
    { id: 4, name: 'Hornos Eléctricos' },
    { id: 5, name: 'Cafeteras' },
    { id: 6, name: 'Pavas Eléctricas' },
    { id: 7, name: 'Tostadoras' },
    { id: 8, name: 'Planchas' },
    { id: 9, name: 'Secadoras de Pelo' },
    { id: 10, name: 'Planchitas de Pelo' },
    { id: 11, name: 'Notebooks' },
    { id: 12, name: 'Cavas de Vino' },
    { id: 13, name: 'Ventiladores' },
    { id: 14, name: 'Estufas' }
  ];

  const handleCategorySelect = (id) => {
    updateFormData('category', id);
    nextStep();
  };

  return (
    <div className="category-selection-container">
      <h2>Selecciona una categoría</h2>
      <div className="category-list">
        {categories.map(category => (
          <div
            key={category.id}
            className="category-item"
            onClick={() => handleCategorySelect(category.id)}
          >
            {/* <img src={iconPath} alt={category.name} className="category-icon" /> */}
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
