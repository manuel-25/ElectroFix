import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    BREVO_USER: process.env.BREVO_USER,
    BREVO_PASS: process.env.BREVO_PASS,
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASS: process.env.MAILER_PASS,
}

export default config