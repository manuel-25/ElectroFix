import React, { useState } from 'react'
import './BrandSelection.css'
import { detailedBrandsByCategory } from '../../utils/productsData'

const BrandSelection = ({ selectedCategory, nextStep, prevStep, updateFormData }) => {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [otherBrand, setOtherBrand] = useState('')
  const [visibleBrands, setVisibleBrands] = useState(7) // Limita la cantidad inicial de marcas visibles

  console.log('id:', selectedCategory.id)
  const categoryBrands = Object.keys(detailedBrandsByCategory[selectedCategory.id]?.brands || {})

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand)
    updateFormData('brand', brand)
    nextStep()
  }

  const handleOtherBrand = () => {
    updateFormData('brand', otherBrand)
    nextStep()
  }

  const loadMoreBrands = () => {
    setVisibleBrands(prevVisibleBrands => prevVisibleBrands + 5)
  }

  return (
    <div className="selection-container">
      <h3>¿Qué marca es tu {selectedCategory.name}?</h3>
      {/*<input
        type="text"
        placeholder="Otro"
        value={otherBrand}
        onChange={(e) => setOtherBrand(e.target.value)}
      />*/}
      <ul className="selection-list">
        {categoryBrands.slice(0, visibleBrands).map((brand, index) => (
          <li key={index} className="selection-item" onClick={() => handleBrandSelect(brand)}>
            <span>{brand}</span>
          </li>
        ))}
      </ul>
      {visibleBrands < categoryBrands.length && (
        <div className="load-more">
          <button onClick={loadMoreBrands}>Ver más</button>
        </div>
      )}
    </div>
  )
}

export default BrandSelection
