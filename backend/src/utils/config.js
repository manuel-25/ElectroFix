import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const config = {
    MONGO_URI: process.env.MONGO_URI
}

export default config