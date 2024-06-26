import nodemailer from 'nodemailer'
import config from '../utils/config.js'

export const sendEmail = async (to, subject, htmlContent) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: config.GMAIL_USER,
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN
        }
    })

    const mailOptions = {
        from: config.GMAIL_USER,
        to: to,
        subject: subject,
        html: htmlContent // Asegúrate de usar html aquí
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Email sending failed')
    }
}
