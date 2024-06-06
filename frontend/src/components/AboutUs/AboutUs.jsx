import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us-section">
            <div className="about-us-content">
                <h2>Sobre Nosotros</h2>
                <p>
                    Bienvenidos a ElectroFix, donde la pasión por la tecnología se encuentra con la dedicación al servicio al cliente. Desde nuestros humildes comienzos, hemos crecido para convertirnos en líderes en la reparación de electrodomésticos, gracias a nuestro compromiso inquebrantable con la calidad y la satisfacción del cliente.
                </p>
                <div className="cards-container">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-image">
                                <img src="/images/reparacion-1094500402-612x612.jpg" alt="Foto del equipo 1" />
                            </div>
                            <div className="text-content">
                                <h3>Valores</h3>
                                <p>
                                    En ElectroFix, valoramos la integridad, la transparencia y la excelencia. Creemos en hacer las cosas bien, no solo por nuestros clientes, sino también por el planeta. Nos esforzamos por reducir el desperdicio electrónico a través de reparaciones efectivas y sostenibles.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="card-image">
                                <img src="/images/reparacion-1094500402-612x612.jpg" alt="Foto del equipo 2" />
                            </div>
                            <div className="text-content">
                                <h3>Objetivos</h3>
                                <p>
                                    Nuestro principal objetivo es devolverle la vida a tus electrodomésticos y hacer que funcionen como nuevos. Queremos ser tu primera opción para todas tus necesidades de reparación, ofreciendo un servicio rápido, confiable y asequible.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="card-image">
                                <img src="/images/reparacion-1094500402-612x612.jpg" alt="Foto del equipo 3" />
                            </div>
                            <div className="text-content">
                                <h3>Misión</h3>
                                <p>
                                    Nuestra misión es ofrecer soluciones de reparación de alta calidad que sean accesibles para todos. Nos dedicamos a prolongar la vida útil de los electrodomésticos, ahorrándote dinero y ayudando a proteger el medio ambiente. Queremos ser más que una simple empresa de reparaciones; queremos ser tus aliados de confianza.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Aquí puedes agregar el resto de tu contenido */}
            </div>
        </section>
    );
};

export default AboutUs;
