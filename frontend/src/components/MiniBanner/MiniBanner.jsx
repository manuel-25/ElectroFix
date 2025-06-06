import React from 'react';
import './MiniBanner.css';
import { bannerTexts } from '../../utils/productsData';

const MiniBanner = () => {
  return (
    <div className="mini-banner">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeXLo8mFnfdP2P5iPXjynSNvr8BWZgEV8gMBFhx0St9IU5LGw/viewform?usp=header"
        target="_blank"
        rel="noopener noreferrer"
        className="mini-banner-link"
      >
        <div className="mini-banner-content">
          {[...bannerTexts, ...bannerTexts].map((text, index) => (
            <span key={index} className="banner-text">
              {text}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
};

export default MiniBanner;
