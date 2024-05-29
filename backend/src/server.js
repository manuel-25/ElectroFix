import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongoose-config.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
await connectDB()

// Routes
/*import serviceRequestRouter from './routes/serviceRequests.js'
app.use('/api/service-requests', serviceRequestRouter)*/

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
