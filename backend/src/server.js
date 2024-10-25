import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/mongoose-config.js';
import serviceRequestRouter from './routes/serviceRequests.js';
import quoteRoutes from './routes/quoteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import cookieParser from 'cookie-parser';
import { errorLogger, logger } from './utils/logger.js';

dotenv.config();

const app = express();
const port = 8000; // config.PORT || 5000

// Middleware
const allowedOrigins = [
  'https://electrosafeweb.com',  // Dominio de producción
  'http://localhost:3000'         // Origen de desarrollo
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('No permitido por CORS'));
  },
  credentials: true // Habilita el uso de credenciales (cookies, autorizaciones)
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/service-requests', serviceRequestRouter);
app.use('/api/quotes', quoteRoutes);
app.use('/api/manager', userRoutes);
app.use('/api/client', clientRoutes);

// MongoDB Connection
await connectDB();

// Middleware para logging de errores
app.use(errorLogger); // Asegúrate de que esto esté después de las rutas

// Middleware general de manejo de errores (opcional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
});

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
