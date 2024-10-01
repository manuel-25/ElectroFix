import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongoose-config.js'
import config from './utils/config.js'
import serviceRequestRouter from './routes/serviceRequests.js'
import quoteRoutes from './routes/quoteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = 8000      //config.PORT || 5000 

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Permite solicitudes solo desde este origen
  credentials: true                 // Habilita el uso de credenciales (cookies, autorizaciones)
}))
app.use(cookieParser())
app.use(express.json())

//Routes
app.use('/api/service-requests', serviceRequestRouter)
app.use('/api/quotes', quoteRoutes)
app.use('/api/manager', userRoutes)

// MongoDB Connection
await connectDB()

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})