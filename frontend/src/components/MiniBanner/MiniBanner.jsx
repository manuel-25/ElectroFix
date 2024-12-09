import React from 'react'
import './MiniBanner.css'
import { bannerTexts } from '../../utils/productsData'

const MiniBanner = () => {
  return (
    <div className="mini-banner">
      <div className="mini-banner-content">
        {bannerTexts.map((text, index) => (
          <span key={index} className="banner-text">
            {text}
            {index < bannerTexts.length - 1 && <span className="spacer">|</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export default MiniBanner
