import React, { useState } from 'react'
import './BrandSelection.css'

const BrandSelection = ({ selectedCategory, nextStep, prevStep, updateFormData }) => {
  const brandsByCategory = {
    1: ['Apple', 'Samsung', 'Xiaomi', 'Motorola', 'Alcatel', 'Nokia', 'LG', 'Huawei', 'Otros'],
    2: ['PS4', 'PS5', 'Xbox', 'Nintendo', 'Otros'],
    3: ['Samsung', 'Apple', 'LG', 'BGH', 'JVC', 'Hisense', 'Sony', 'Philco', 'Admiral', 'RCA', 'Noblex', 'Phillips', 'TCL', 'Pioner', 'Telefunken', 'Ken Brown', 'Otros'],
    4: ['Ultracomb', 'Peabody', 'BGH', 'Atma', 'Philco', 'Kanji', 'Morelli', 'Smartlife', 'Alpaca', 'Enova', 'Tedge', 'Tivoli', 'Liliana', 'Midea', 'Daewo', 'Yelmo', 'Black and Decker', 'Tophouse', 'Smart Tech', 'Axel', 'Otros'],
    5: ['Peabody', 'Atma', 'Electrolux', 'Oster', 'Molinex', 'Yelmo', 'Smart Life', 'Nesspreso', 'Otros'],
    6: ['Yelmo', 'Peabody', 'Ultra Comb', 'Liliana', 'Atma', 'Smart Life', 'Phillips', 'Winco', 'Molinex', 'Daewo', 'Oster', 'Philco', 'Tophouse', 'Otros'],
    7: ['Atma', 'Molinex', 'Peabody', 'Black and Decker', 'Electro Lux', 'Phillips', 'Daewo', 'Yelmo', 'Ultra Comb', 'Winco', 'Smart Life', 'Liliana', 'Kajijome', 'Oster', 'Smart Tech', 'Otros'],
    8: ['Phillips', 'Atma', 'Ultra Comb', 'Winco', 'Liliana', 'Philco', 'Peabody', 'Tophouse', 'Otros'],
    9: ['Gama', 'Otros'],
    10: ['Otros'],
    11: ['Dell', 'Samsung', 'Otros'],
    12: ['Vondom', 'Philco', 'Whirlpool', 'Tophouse', 'Winco', 'Wine Collection', 'Candy', 'Ultra Comb', 'Wine Frost', 'Otros'],
    13: ['Liliana', 'Electro Lux', 'Axel', 'Magiclick', 'Atma', 'Philco', 'Peabody', 'Otros'],
    14: ['Otros']
  }

  const [selectedBrand, setSelectedBrand] = useState('')
  const [otherBrand, setOtherBrand] = useState('')

  const categoryBrands = brandsByCategory[selectedCategory] || []

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand)
    updateFormData('brand', brand)
    nextStep()
  }

  const handleOtherBrand = () => {
    updateFormData('brand', otherBrand)
    nextStep()
  }

  return (
    <div className="brand-selection-container">
      <h2>Selecciona una marca</h2>
      {/*<input
            type="text"
            placeholder="Otro"
            value={otherBrand}
            onChange={(e) => setOtherBrand(e.target.value)}
        />*/}
      <ul className="brand-list">
        {categoryBrands.map((brand, index) => (
          <li key={index} className="brand-item" onClick={() => handleBrandSelect(brand)}>
            <span>{brand}</span>
          </li>
        ))}
      </ul>
      <div className='nav-buttons'>
        <button className="back-button" onClick={prevStep}>Atrás</button>
        <button onClick={handleOtherBrand}>Aceptar</button>
      </div>
    </div>
  )
}

export default BrandSelection
