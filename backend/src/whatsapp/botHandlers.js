import ConversationManager from '../Mongo/ConversationManager.js';
import { updateSession } from './sessionManager.js';

const DEV_PHONE = '5491121842237@c.us';

// 🔥 Flags
const botSending = new Set();
const messageTracker = new Map();
const humanTimeouts = new Map();

// Anti spam config
const SPAM_LIMIT = 3;
const SPAM_WINDOW = 10000;
const SPAM_BLOCK_TIME = 30000;

const waitingResponseCooldown = new Map();
const WAITING_COOLDOWN_TIME = 15000; // 15 segundos

// Tiempo espera humano (1 hora)
const HUMAN_WAIT_TIME = 60 * 60 * 1000;


// ========================================
// 🚫 ANTI SPAM
// ========================================
async function isSpamming(userId, client) {

  const now = Date.now();

  if (!messageTracker.has(userId)) {
    messageTracker.set(userId, {
      count: 1,
      firstMessageTime: now,
      blockedUntil: null,
      warned: false
    });
    return false;
  }

  const data = messageTracker.get(userId);

  if (data.blockedUntil && now < data.blockedUntil) {
    return true;
  }

  if (now - data.firstMessageTime > SPAM_WINDOW) {
    data.count = 1;
    data.firstMessageTime = now;
    data.blockedUntil = null;
    data.warned = false;
    return false;
  }

  data.count++;

  if (data.count >= SPAM_LIMIT) {
    data.blockedUntil = now + SPAM_BLOCK_TIME;

    if (!data.warned) {
      data.warned = true;

      await client.sendMessage(userId,
  `⚠️ Por favor aguardá unos segundos antes de enviar más mensajes.`
      );
    }

    console.log('🚫 Usuario bloqueado por spam:', userId);
    return true;
  }

  return false;
}


// ========================================
// 🤖 BOT SEND
// ========================================
async function botSend(client, chatId, text) {

  if (chatId.includes('status@broadcast')) return;
  if (!chatId.endsWith('@c.us')) return;

  botSending.add(chatId);

  const sentMessage = await client.sendMessage(chatId, text);

  await ConversationManager.addBotMessage(chatId, {
    messageId: sentMessage.id._serialized,
    text,
    sentAt: new Date()
  });

  setTimeout(() => {
    botSending.delete(chatId);
  }, 800);

  return sentMessage;
}


// ========================================
// ⏳ TIMER ESPERA HUMANO
// ========================================
function startHumanTimer(client, chatId) {

  if (humanTimeouts.has(chatId)) {
    clearTimeout(humanTimeouts.get(chatId));
  }

  const timeout = setTimeout(async () => {

    const conversation = await ConversationManager.getByPhone(chatId);
    if (!conversation) return;

    if (!conversation.pendingHuman) return;
    if (conversation.apologySent) return;

    await botSend(client, chatId,
`🙏 Disculpas por la demora.

En este momento todos los asesores están ocupados.

Tu consulta fue priorizada y te responderemos lo antes posible.`
    );

    await ConversationManager.setPriority(chatId, true);
    await ConversationManager.setApologySent(chatId, true);

    console.log('⏳ Conversación priorizada automáticamente:', chatId);

  }, HUMAN_WAIT_TIME);

  humanTimeouts.set(chatId, timeout);
}


// ========================================
// 👤 ESCALAR
// ========================================
async function escalateToHuman(client, chatId) {

  await ConversationManager.createOrUpdate(chatId, {
    pendingHuman: true,
    humanRequestedAt: new Date(),
    waitingSince: new Date(),
    priority: false,
    apologySent: false
  });

  await botSend(client, chatId,
`👤 Un asesor humano te responderá a la brevedad.

Gracias por tu paciencia 🙌`
  );

  startHumanTimer(client, chatId);

  console.log('✅ Escalado a humano:', chatId);
}


// ========================================
// 🚀 HANDLER PRINCIPAL
// ========================================
export default function botHandlers(client) {

  // ========================================
  // 📩 MENSAJES ENTRANTES
  // ========================================
  client.on('message', async (message) => {

    try {

      if (message.from !== DEV_PHONE) return;
      if (message.fromMe) return;
      if (!message.body) return;
      if (!message.from.endsWith('@c.us')) return;

      const userId = message.from;
      const text = message.body.toLowerCase().trim();

      if (await isSpamming(userId, client)) {
        console.log('🚫 Ignorado por spam:', userId);
        return;
      }

      await ConversationManager.createOrUpdate(userId, {
        lastMessage: text,
        lastMessageAt: new Date()
      });

      const conversation = await ConversationManager.getByPhone(userId);
      if (!conversation) return;

      // ========================================
      // 🔄 VOLVER AL MENÚ
      // ========================================
      if (text === 'hola' || text === 'menu') {

        if (conversation.pendingHuman) {
          await ConversationManager.createOrUpdate(userId, {
            pendingHuman: false,
            priority: false,
            apologySent: false
          });

          if (humanTimeouts.has(userId)) {
            clearTimeout(humanTimeouts.get(userId));
            humanTimeouts.delete(userId);
          }
        }

        updateSession(userId, { step: 'menu' });

        await botSend(client, userId,
`👋 ¡Hola! Somos *Electrosafe Quilmes*.

¿En qué podemos ayudarte?

1️⃣ Reparar un electrodoméstico
2️⃣ Consultar estado
3️⃣ Horarios y dirección
4️⃣ Hablar con asesor

Respondé con el número.`
        );

        return;
      }

      // ========================================
      // 👤 YA EN MODO HUMANO
      // ========================================
      if (conversation.pendingHuman) {
    const now = Date.now();
    const lastSent = waitingResponseCooldown.get(userId);

    if (!lastSent || now - lastSent > WAITING_COOLDOWN_TIME) {

      await botSend(client, userId,
  `👤 Estamos aguardando un asesor.

  En breve te responderá 🙌

  Si querés volver al menú escribí *hola*.`
      );

      waitingResponseCooldown.set(userId, now);
    }

    return;
  }

      await ConversationManager.incrementUnread(userId);

      // ========================================
      // OPCIONES MENÚ
      // ========================================
      if (text === '1') {
        await botSend(client, userId,
`🔧 Cotizá tu reparación acá:

https://electrosafeweb.com/reparacion-electrodomesticos`
        );
        return;
      }

      if (text === '2') {
        await botSend(client, userId,
`📦 Enviános:

• Nombre
• Modelo
• Número de orden`
        );
        return;
      }

      if (text === '3') {
        await botSend(client, userId,
`🕒 Horarios:

Lunes a Viernes: 10 a 18 hs
Sábados: 10 a 13 hs

📍 Av. Vicente López 770, Quilmes`
        );
        return;
      }

      if (text === '4') {
        updateSession(userId, { step: 'waiting_human' });
        await escalateToHuman(client, userId);
        return;
      }

      await botSend(client, userId,
`🤖 No entendí ese mensaje.

Escribí *hola* para ver el menú.`
      );

    } catch (err) {
      console.error('❌ Error en message:', err);
    }

  });


  // ========================================
  // 👤 DETECCIÓN HUMANO REAL
  // ========================================
  client.on('message_create', async (message) => {

    try {

      if (message.to !== DEV_PHONE) return;
      if (!message.fromMe) return;
      if (!message.to.endsWith('@c.us')) return;

      const userId = message.to;

      if (botSending.has(userId)) return;

      const conversation = await ConversationManager.getByPhone(userId);
      if (!conversation) return;
      if (!conversation.pendingHuman) return;

      await ConversationManager.setPending(userId, false);
      await ConversationManager.resetUnread(userId);

      if (humanTimeouts.has(userId)) {
        clearTimeout(humanTimeouts.get(userId));
        humanTimeouts.delete(userId);
      }

      console.log('✅ Conversación tomada por humano:', userId);

    } catch (err) {
      console.error('❌ Error en message_create:', err);
    }

  });

}