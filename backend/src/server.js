import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongoose-config.js'
import config from './utils/config.js'
import serviceRequestRouter from './routes/serviceRequests.js'
import quoteRoutes from './routes/quoteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import clientRoutes from './routes/clientRoutes.js'

dotenv.config()

const app = express()
const port = config.PORT || 5000    //8000

// Middleware
const allowedOrigins = [
  'https://electrosafeweb.com',  // Dominio de producción
  'http://localhost:3000'         // Origen de desarrollo
]

app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes sin origen (como las de herramientas como Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('No permitido por CORS'));
  },
  credentials: true // Habilita el uso de credenciales (cookies, autorizaciones)
}))
app.use(cookieParser())
app.use(express.json())

//Routes
app.use('/api/service-requests', serviceRequestRouter)
app.use('/api/quotes', quoteRoutes)
app.use('/api/manager', userRoutes)
app.use('/api/client', clientRoutes)

// MongoDB Connection
await connectDB()

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})