import React from 'react';
import QuoteButton from '../QuoteButton/QuoteButton';
import './MainContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

function MainContent() {
    return (
        <div>
            <div className="reparation-container">
                <section className="section-reparation">
                    <div className='reparation-top'>
                        <h1>¡Reparamos tu equipo!</h1>
                        <p>¿Se rompió tu equipo?</p>
                    </div>
                    <div className="reparation-bottom">
                        <input type="text" placeholder="Buscar electrodoméstico" />
                        <Link to="/services"><QuoteButton text="Cotizar Ahora" /></Link>
                    </div>
                </section>
            </div>
            <section className='features-container'>
                <ul className='features-list'>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Evios en</span>
                            <span className='feature-bold'>Todo el país</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Cuotas</span>
                            <span className='feature-bold'>Sin interés</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Garantía</span>
                            <span className='feature-bold'>Por 6 meses</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Diagnóstico</span>
                            <span className='feature-bold'>Bonificado</span>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default MainContent;