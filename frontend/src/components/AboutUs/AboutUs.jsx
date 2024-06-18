import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us-section">
            <div className="about-us-content">
                <h2>Sabemos de dónde venimos</h2>
                <img src="/images/sabemosdedondevenimos.webp" alt="Banner del equipo" className="about-us-image"/>
                <p>
                   Electrosafe, donde la pasión por la tecnología se fusiona con la dedicación al servicio al cliente. Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en líderes en la reparación de electrodomésticos, impulsados por nuestro compromiso inquebrantable con la calidad, la rapidez y la eficiencia. Nuestros clientes nos describen como responsables y eficientes, y nos esforzamos cada día por superar sus expectativas con un trabajo bien hecho y un servicio rápido y confiable.
                </p>
                
                <div className="values-section">
                    <h3>Nuestros Valores</h3>
                    <p>
                        En Electrosafe, nuestros valores fundamentales son la honestidad, la integridad y la responsabilidad. Nos enorgullecemos de ofrecer servicios transparentes y fiables, asegurándonos de que cada cliente reciba la mejor atención posible.
                    </p>
                </div>

                <div className="experience-section">
                    <h3>Experiencia y Profesionalismo</h3>
                    <p>
                        Contamos con un equipo de técnicos altamente capacitados con años de experiencia en la reparación de todo tipo de electrodomésticos. Utilizamos herramientas y técnicas de vanguardia para garantizar que cada reparación sea efectiva y duradera.
                    </p>
                </div>

                <div className="contact-section">
                    <h3>Llámanos Hoy Mismo</h3>
                    <p>
                        ¿Tienes un electrodoméstico que necesita reparación? No dudes en contactarnos. Estamos aquí para ayudarte a que tus equipos vuelvan a funcionar como nuevos.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
