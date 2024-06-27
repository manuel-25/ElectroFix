import nodemailer from 'nodemailer';
import config from '../utils/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: "electrosafeservice@gmail.com",
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
    accessToken: config.ACCESS_TOKEN
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: "electrosafeservice@gmail.com",
      to: to,
      subject: subject,
      html: htmlContent,
    };

    console.log('Mail options:', mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
    console.error('Full error details:', error);
    throw new Error('Email sending failed', error);
  }
};
