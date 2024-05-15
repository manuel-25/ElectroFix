import React from 'react'
import QuoteButton from '../QuoteButton/QuoteButton';
import './MainContent.css'

function MainContent() {
    return (
        <div className="main-content">
            <section className="section-reparation">
                <div className='reparation-top'>
                    <h2>¡Reparamos tu equipo!</h2>
                    <p>¿Se rompió tu equipo?</p>
                </div>
                <div className="reparation-bottom">
                    <input type="text" placeholder="Describe el problema..." />
                    <QuoteButton text="Cotizar Ahora" />
                </div>
            </section>
        </div>
    )
}

export default MainContent;