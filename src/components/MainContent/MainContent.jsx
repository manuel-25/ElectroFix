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
                        <h2>¡Reparamos tu equipo!</h2>
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

/*
<div className="categories">
                <FaMobileAlt size={50} />
                <FaGamepad size={50} />
                <FaCube size={50} />
                <FaTv size={50} />
                <FaFireAlt size={50} />
                <FaCoffee size={50} />
                <FaMugHot size={50} />
                <FaBreadSlice size={50} />
                <FaTshirt size={50} />
                <FaWind size={50} />
                <FaStream size={50} />
                <FaWineGlass size={50} />
                <FaTablet size={50} />
                <FaPlaystation size={50} />
                <FaVrCardboard size={50} />
                <FaOilCan size={50} />
                <FaMobile size={50} />
</div>

<FontAwesomeIcon icon={faWineGlass} />
<FontAwesomeIcon icon={faTablet} />
<FontAwesomeIcon icon={faPlaystation} />
<FontAwesomeIcon icon={faXbox} />
<FontAwesomeIcon icon={FaVrCardboard} />
<FontAwesomeIcon icon={faTv} />
<FontAwesomeIcon icon={faOilCan} />
<FontAwesomeIcon icon={faMobileScreen} />
*/

/*import { FaMobileAlt, FaGamepad, FaCube, FaTv, FaFireAlt, FaCoffee, FaMugHot, FaBreadSlice, FaTshirt, FaWind, FaStream, FaWineGlass,
    FaTablet, FaPlaystation, FaXbox, FaVrCardboard, FaOilCan, FaMobile
 } from 'react-icons/fa';*/