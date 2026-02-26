import ConversationManager from '../Mongo/ConversationManager.js';
import { getSession, updateSession } from './sessionManager.js';
import { logger } from '../utils/logger.js';

const DEV_PHONES = [
  '5491121842237@c.us',
  '5491136106124@c.us'
];

// ================================
// 🔤 NORMALIZADORES
// ================================
function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeNumbers(text) {
  const map = { 'uno':'1','dos':'2','tres':'3','cuatro':'4' };
  text = text.toLowerCase();
  for (const [word,num] of Object.entries(map)) {
    text = text.replace(new RegExp(`\\b${word}\\b`, 'g'), num);
  }
  return text;
}

// ================================
// 👋 SALUDO
// ================================
function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Buen día";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

function detectUserGreeting(text) {
  const greetings = ["hola","holaa","holi","buen dia","buenos dias","buenas tardes","buenas noches","buenas"];
  const clean = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return greetings.some(g => clean.includes(g));
}

// ================================
// 🎯 INTENCIONES
// ================================
function wantsHuman(text) {
  return ['asesor','humano','persona','operador','alguien'].some(t => text.includes(t));
}

function wantsRepair(text) {
  return ['reparar','arreglar','cotizar','presupuesto','no anda','no funciona','no enciende','no prende','se rompio','se apago'].some(t => text.includes(t));
}

function wantsLocation(text) {
  return ['horario','direccion','donde','ubicacion','abren','cierran','sucursal'].some(t => text.includes(t));
}

function wantsToClose(text) {
  const closing = ['no gracias','ninguna','nada','esta bien','ok','listo','chau','adios'];
  return closing.includes(text.trim());
}

function detectFrustration(text) {
  return ['no entiendo','no me entendiste','esto no funciona','que pasa'].some(t => text.includes(t));
}

function isThanks(text) {
  return ['gracias','muchas gracias','mil gracias'].includes(text.trim());
}

// ================================
// 🤖 ENVÍO MENSAJE
// ================================
async function botSend(client, chatId, text) {
  try {

    const sent = await client.sendMessage(chatId, text);

    // Guardar mensaje del bot
    await ConversationManager.addMessage(chatId, {
      sender: 'bot',
      text
    });

    // Actualizar última actividad
    await ConversationManager.createOrUpdate(chatId, {
      lastMessageAt: new Date()
    });

    return sent;

  } catch (err) {
    logger.error(`Error enviando mensaje a ${chatId}: ${err.message}`);
  }
}

// ================================
// 👤 ESCALAR HUMANO
// ================================
async function escalateToHuman(client, chatId) {
  try {
    const conv = await ConversationManager.getByPhone(chatId);

    const updateData = { pendingHuman: true, humanRequestedAt: new Date() };

    // Solo poner status 'pending' si no está en progreso
    if (!conv || conv.status !== 'in_progress') {
      updateData.status = 'pending';
    }

    await ConversationManager.createOrUpdate(chatId, updateData);

    await botSend(client, chatId,
`👤 Un asesor humano te responderá a la brevedad.

Mientras tanto, podés dejar detallada tu consulta 🙌

Escribí *cancelar* si querés volver al menú.`);

    updateSession(chatId, { step: 'waiting_human', fallbackCount: 0 });

  } catch (err) {
    logger.error(`Error escalando a humano para ${chatId}: ${err.message}`);
  }
}

// ================================
// 🚀 HANDLER PRINCIPAL
// ================================
export default function botHandlers(client) {

  global.client = client;

  client.on('message', async (message) => {

    try {

      if (!DEV_PHONES.includes(message.from)) return;
      if (message.fromMe) return;
      if (!message.body) return;

      const userId = message.from;
      const contact = await message.getContact();
      const name = contact.pushname || '';

      const originalText = message.body.trim();
      let text = normalize(originalText);
      text = normalizeNumbers(text);

      // ================================
      // 🔥 ACTUALIZAR GESTIÓN COMPLETA
      // ================================
      await ConversationManager.createOrUpdate(userId, {
        phone: userId,
        contactName: name,
        lastMessageAt: new Date(),
        lastCustomerMessage: originalText,
        $inc: { unreadCount: 1 }
      });

      await ConversationManager.addMessage(userId, {
        sender: 'user',
        text: originalText
      });

      const session = getSession(userId) || {};
      const fallbackCount = session.fallbackCount || 0;

      // ================================
      // 🛑 ESPERANDO HUMANO
      // ================================
      if (session.step === 'waiting_human') {

        if (text === 'cancelar') {

          await ConversationManager.resolveConversation(userId);

          updateSession(userId, { step: 'menu', fallbackCount: 0 });

          await botSend(client, userId,
`❌ Solicitud cancelada.

Volvemos al menú 👇

1️⃣ Reparar un electrodoméstico  
2️⃣ Ver horarios y dirección  
3️⃣ Hablar con asesor`);

        }

        return;
      }

      // ================================
      // 👋 SALUDO
      // ================================
      const isFirstMessage = !session.lastMessageAt;

      if (detectUserGreeting(text) || isFirstMessage) {

        updateSession(userId, { step: 'menu', fallbackCount: 0 });

        await botSend(client, userId,
`👋 ${getTimeGreeting()} ${name}, somos *Electrosafe Quilmes*.`);

        await botSend(client, userId,
`Podés elegir:

1️⃣ Reparar un electrodoméstico  
2️⃣ Ver horarios y dirección  
3️⃣ Hablar con asesor`);

        return;
      }

      // ================================
      // 👤 HUMANO
      // ================================
      if (wantsHuman(text) || text === '3') {
        await escalateToHuman(client, userId);
        return;
      }

      // ================================
      // 🔧 REPARACIÓN
      // ================================
      if (wantsRepair(text) || text === '1') {
        await botSend(client, userId,
`🔧 Podés cotizar tu reparación acá:
https://electrosafeweb.com/reparacion-electrodomesticos`);
        return;
      }

      // ================================
      // 🕒 UBICACIÓN
      // ================================
      if (wantsLocation(text) || text === '2') {
        await botSend(client, userId,
`📍 Av. Vicente López 770 - Quilmes

🕒 Lunes a Viernes 10 a 18 hs  
Sábados 10 a 13 hs`);
        return;
      }

      // ================================
      // 🔚 CIERRE
      // ================================
      if (wantsToClose(text)) {
        await botSend(client, userId,
`Perfecto 😊

Si necesitás algo más escribinos cuando quieras.`);
        updateSession(userId, { step: 'menu', fallbackCount: 0 });
        return;
      }

      // ================================
      // 😕 FRUSTRACIÓN
      // ================================
      if (detectFrustration(text)) {
        await botSend(client, userId,
`Perdón si no fui claro 🙏

Podés elegir:
1️⃣ Reparar  
2️⃣ Ubicación  
3️⃣ Asesor`);
        return;
      }

      // ================================
      // 🙏 GRACIAS
      // ================================
      if (isThanks(text)) {
        await botSend(client, userId, `😊 ¡Gracias a vos!`);
        return;
      }

      // ================================
      // 🧠 FALLBACK
      // ================================
      if (fallbackCount >= 2) {
        await escalateToHuman(client, userId);
        updateSession(userId, { fallbackCount: 0 });
        return;
      }

      updateSession(userId, { fallbackCount: fallbackCount + 1 });

      await botSend(client, userId,
`No estoy seguro de haber entendido 🤔

1️⃣ Reparar  
2️⃣ Ubicación  
3️⃣ Asesor`);

    } catch (err) {
      logger.error(`❌ Error en message: ${err.message}`);
    }

  });
}