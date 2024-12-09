import winston from 'winston'
import { Mail } from 'winston-mail'
import config from './config.js'

// Define los colores para los niveles de log
winston.addColors({
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
})

// Crea el logger con los niveles y colores personalizados
const logger = winston.createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => {
        return new Date().toLocaleString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour12: false,
        });
      },
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),  
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new Mail({
      to: config.GMAIL_USER,
      from: config.GMAIL_USER,
      subject: 'Error occurred!',
      level: 'error',
      host: 'smtp-relay.brevo.com',
      username: config.BREVO_USER,
      password: config.BREVO_PASS,
      port: 587,
      secure: false,
    }),
  ],
})

// Interceptar el log y personalizar el contenido del correo
logger.on('logging', (transport, log) => {
  if (log.level === 'error' || log.level === 'fatal') {
    const customContent = `
      <p><strong>Error en la Aplicación</strong></p>
      <p>${log.message}</p>
      <p><strong>Hora del error:</strong> ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false })}</p>
    `

    // Actualizar el contenido del correo
    transport.content = customContent
  }
})

export { logger }
