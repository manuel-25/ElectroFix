import nodemailer from 'nodemailer';
import { google } from 'googleapis'; // Importa googleapis en lugar de google-auth-library
import config from '../utils/config.js';

// Configura el cliente OAuth2
const oAuth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);
oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

// Función para obtener el ACCESS_TOKEN
const getAccessToken = async () => {
  try {
    const { token } = await oAuth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error('Error obteniendo ACCESS_TOKEN:', error.message);
    throw new Error('No se pudo obtener el ACCESS_TOKEN');
  }
};

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: "electrosafeservice@gmail.com",
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
    accessToken: await getAccessToken()
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Escucha eventos de actualización de token (opcional)
transporter.on('token', token => {
  console.log('Se generó un nuevo ACCESS_TOKEN');
  console.log('Usuario: %s', token.user);
  console.log('ACCESS_TOKEN: %s', token.accessToken);
  console.log('Expira: %s', new Date(token.expires));
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

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ', info.response);

    return info;
  } catch (error) {
    console.error('Error enviando correo:', error.message);
    console.error('Detalles completos del error:', error);
    throw new Error('Fallo al enviar el correo');
  }
};
