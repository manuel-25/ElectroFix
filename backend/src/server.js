import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongoose-config.js'
import config from './utils/config.js'
import serviceRequestRouter from './routes/serviceRequests.js'
import quoteRoutes from './routes/quoteRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const port = 8000      //config.PORT || 5000 

// Middleware
app.use(cors())
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