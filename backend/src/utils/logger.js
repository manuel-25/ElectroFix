import winston from 'winston';
import { sendEmail } from '../services/emailService.js';
import config from './config.js';

// Define los colores para los niveles de log
winston.addColors({
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
});

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
    winston.format.colorize(),
    winston.format.timestamp({
      format: () => {
        // Obtener la hora actual en Buenos Aires (GMT-3)
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
  ],
});

// Middleware para registrar errores y enviar correos
const errorLogger = (err, req, res, next) => {
    console.log('entre', err);
  
    // Verifica el mensaje del error o utiliza el logger para determinar el nivel
    const isFatalError = err.message.includes('fatal'); // Ajusta según tu lógica

    // Enviar correo en caso de error fatal
    if (isFatalError) {
        const emailContent = `
            <p><strong>Error Fatal en Electrosafeweb.com</strong></p>
            <p>Se ha producido un error fatal:</p>
            <p>${err.message}</p>
            <p><strong>Hora del error (Argentina):</strong> ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false })}</p>
            <p><strong>Detalles del Request:</strong></p>
            <p>URL: ${req.originalUrl}</p>
            <p>Método: ${req.method}</p>
            <p>Parámetros: ${JSON.stringify(req.body)}</p>
        `;

        sendEmail(config.NOTIFY_EMAIL, 'Error Fatal en la Aplicación', emailContent)
            .then(() => {
                logger.info('Correo de error fatal enviado correctamente.');
            })
            .catch((error) => {
                logger.error('Error al enviar correo de notificación:', error);
            });
    }

    next(err);
};


export { logger, errorLogger };
