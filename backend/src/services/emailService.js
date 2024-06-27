import nodemailer from 'nodemailer';
import config from '../utils/config.js';

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'electrosafeservice@gmail.com',
    pass: config.GMAIL_PASS
  }
});

// Función para enviar correos electrónicos
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: "electrosafeservice@gmail.com",
      to: to,
      subject: subject,
      html: htmlContent,
    };

    console.log('Mail options:', mailOptions); // Registrar opciones del correo

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response); // Registrar respuesta del envío

    return info; // Devolver información del envío si es necesario
  } catch (error) {
    console.error('Error sending email:', error.message); // Registrar mensaje de error
    console.error('Full error details:', error); // Registrar detalles completos del error

    throw new Error('Email sending failed'); // Lanzar error con mensaje descriptivo
  }
};
