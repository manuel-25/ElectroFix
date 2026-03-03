import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongoose-config.js'
import quoteRoutes from './routes/quoteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import logRoutes from './routes/logRoutes.js'
import cookieParser from 'cookie-parser'
import config from './utils/config.js'
import { logger } from './utils/logger.js'

//Whatsapp
import qrcode from 'qrcode-terminal'
import client from './whatsapp/whatsappClient.js'
import botHandlers from './whatsapp/botHandlers.js'

dotenv.config()

const app = express()
const port = config.PORT || 5000 // config.PORT || 5000

// Middleware
const allowedOrigins = [
  'https://electrosafeweb.com',  // Dominio de producción
  'http://localhost:3000'         // Origen de desarrollo
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true)
    }
    return callback(new Error('No permitido por CORS'))
  },
  credentials: true // Habilita el uso de credenciales (cookies, autorizaciones)
}))
app.use(cookieParser())
app.use(express.json())

// Routes
app.use('/api/quotes', quoteRoutes)
app.use('/api/manager', userRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/conversations', conversationRoutes)

// MongoDB Connection
await connectDB()

// Middleware general de manejo de errores (opcional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message })
})

// ================================
// ⏱ CHECK PRIORITY WHATSAPP
// ================================
import ConversationManager from './Mongo/ConversationManager.js'

setInterval(async () => {
  try {
    await ConversationManager.checkWaitingPriority(60); // 1 minuto para pruebas
  } catch (error) {
    console.error('Error revisando prioridades:', error);
  }
}, 60 * 1000); // cada 1 minuto

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`)
})

// ====== WHATSAPP BOT ======

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  logger.info('WhatsApp Bot conectado ✅');
});

client.on('change_state', (state) => {
  console.log('🔄 Estado cambió a:', state);
});

client.on('disconnected', async (reason) => {
  console.log('❌ WhatsApp desconectado:', reason);

  try {
    await client.destroy();
    await client.initialize();
  } catch (err) {
    console.error('Error reiniciando cliente:', err);
  }
});

// 🔥 HANDLERS DE MENSAJES
botHandlers(client);

// 🚀 INICIALIZAR
client.initialize();

// 🛡 WATCHDOG PRODUCCIÓN
setInterval(async () => {
  try {
    const state = await client.getState();
    console.log('🟢 Estado actual:', state);

    if (state !== 'CONNECTED') {
      console.log('⚠️ Cliente no conectado. Reiniciando...');
      await client.destroy();
      await client.initialize();
    }
  } catch (err) {
    console.log('💥 Error obteniendo estado. Reiniciando...');
    await client.destroy();
    await client.initialize();
  }
}, 60000);