import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongoose-config.js'
import config from './utils/config.js'
import serviceRequestRouter from './routes/serviceRequests.js'

dotenv.config()

const app = express()
const port = config.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/service-requests', serviceRequestRouter)

// MongoDB Connection
await connectDB()

// Routes
/*import serviceRequestRouter from './routes/serviceRequests.js'
app.use('/api/service-requests', serviceRequestRouter)*/

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
