import nodemailer from 'nodemailer';
import config from '../utils/config.js';

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587, // Puede ser 465 para SSL/TLS o 587 para STARTTLS
  secure: false, // true para port 465, false para otros puertos
  auth: {
    user: config.BREVO_USER,
    pass: config.BREVO_PASS
  }
})

// Función para enviar correos electrónicos
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: config.GMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ', info.response);

    return info;
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw new Error('Fallo al enviar el correo');
  }
};
