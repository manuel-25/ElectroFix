import nodemailer from 'nodemailer';
import config from '../utils/config.js';
import { OAuth2Client } from 'google-auth-library'

// Configure OAuth2 client
const oAuth2Client = new OAuth2Client(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN })

// Get the access token
const getAccessToken = async () => {
  const res = await oAuth2Client.getAccessToken();
  return res.token;
}

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
})

transporter.on('token', token => {
  console.log('A new access token was generated');
  console.log('User: %s', token.user);
  console.log('Access Token: %s', token.accessToken);
  console.log('Expires: %s', new Date(token.expires));
})

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
