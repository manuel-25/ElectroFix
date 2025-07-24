import React from 'react';
import './MiniBanner.css';
import { bannerTexts } from '../../utils/productsData';

const MiniBanner = () => {
  return (
    <div className="mini-banner">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSflNZGZrzn4I4vdzWLeckvwaQxpIpJLyUpPXHEF_8EMePuW_w/viewform?usp=header"
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
