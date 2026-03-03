// botHandlers.js
import ConversationManager from '../Mongo/ConversationManager.js';
import ServiceManager from '../Mongo/ServiceManager.js';
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

function wantsRepairStatus(text) {
  return ['estado','arreglo','reparación','reparacion','servicio'].some(t => text.includes(t));
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

    await ConversationManager.addMessage(chatId, {
      sender: 'bot',
      text
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

    if (!conv || conv.status !== 'in_progress') {
      await ConversationManager.createOrUpdate(chatId, {
        status: 'waiting',
        humanRequestedAt: new Date()
      });
    }

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
// 📦 CONSULTA ESTADO SERVICIO
// ================================
async function checkRepairStatus(client, chatId, text, originalText) {
  // Cancelar
  if (text === 'cancelar') {
    updateSession(chatId, { step: 'menu', fallbackCount: 0 });
    await botSend(client, chatId,
`❌ Consulta cancelada.  
Volvemos al menú 👇

1️⃣ Reparar un electrodoméstico  
2️⃣ Consultar el estado de tu reparación  
3️⃣ Ver horarios y dirección  
4️⃣ Hablar con un asesor`);
    return true;
  }

  // Escalar a humano
  if (wantsHuman(text)) {
    await escalateToHuman(client, chatId);
    return true;
  }

  // Validación de código
  const publicId = originalText.trim(); // <<< usar el texto original SIN normalizar
  if (!/^[a-zA-Z0-9]{6,10}$/.test(publicId)) {
    await botSend(client, chatId,
`❌ Código inválido.  
Ingresalo nuevamente o escribí *cancelar* para volver al menú.`);
    return true;
  }

  const service = await ServiceManager.getByPublicId(publicId);

  if (!service) {
    await botSend(client, chatId,
`❌ No encontramos un servicio con ese código.  
Verificá que esté bien escrito.  
Si querés salir escribí *cancelar*.  
Si necesitás ayuda, escribí *asesor* y te ayudamos personalmente 🙌`);
    return true;
  }

  // Mostrar estado del servicio
  await botSend(client, chatId,
`📦 Estado de tu equipo:
🔧 Equipo: ${service.device || service.equipmentType}
🏷 Marca: ${service.brand}
📊 Estado: ${service.status}

Si tenés dudas podés escribir *asesor* para hablar con un humano.`);

  updateSession(chatId, { step: 'menu', fallbackCount: 0 });
  return true;
}

// ================================
// 🚀 HANDLER PRINCIPAL
// ================================
export default function botHandlers(client) {
  global.client = client;

  client.on('message', async (message) => {
    try {
      console.log('📩 Mensaje detectado:', message.from, message.body);
      if (!DEV_PHONES.includes(message.from)) return;
      if (message.fromMe) return;
      if (!message.body) return;

      const userId = message.from;
      const contact = await message.getContact();
      const name = contact.pushname || '';

      const originalText = message.body.trim();
      let text = normalize(originalText);
      text = normalizeNumbers(text);

      await ConversationManager.addMessage(userId, {
        sender: 'user',
        text: originalText
      });

      // OBTENGO LA SESSION DEL USUARIO
      const session = getSession(userId) || {};
      const fallbackCount = session.fallbackCount || 0;

      // 🔹 OBTENGO CONVERSACIÓN
      const conversation = await ConversationManager.getByPhone(userId);

      // ================================  
      // 🔄 PRIMERO REINICIO SI ESTABA RESUELTA
      // ================================

      if (conversation?.status === 'resolved') {

        await ConversationManager.updateByPhone(userId, {
          status: 'bot',
          assignedTo: null,
          humanRequestedAt: null,
          firstResponseAt: null,
          humanRequestedAt: null
        });

        updateSession(userId, { step: 'menu', fallbackCount: 0 });

        await botSend(client, userId, 
      `👋 ${getTimeGreeting()} ${name}, somos *Electrosafe Quilmes*.`);

        await botSend(client, userId,
      `Podés elegir un número o escribir lo que necesitás:

 1️⃣ Reparar un electrodoméstico  
 2️⃣ Consultar el estado de tu reparación  
 3️⃣ Ver horarios y dirección  
 4️⃣ Hablar con un asesor`);

        return;
      }

      // ================================  
      // MODO HUMANO
      // ================================

      // 🟡 Esperando que alguien lo tome
      if (conversation?.status === 'waiting' || conversation?.status === 'priority') {

        if (text === 'cancelar') {
          await ConversationManager.resolveConversation(userId);

          updateSession(userId, { step: 'menu', fallbackCount: 0 });

          await botSend(client, userId,
      `❌ Solicitud cancelada.

      Volvemos al menú 👇
      1️⃣ Reparar un electrodoméstico  
      2️⃣ Consultar el estado de tu reparación  
      3️⃣ Ver horarios y dirección  
      4️⃣ Hablar con un asesor`);
        }

        return;
      }

      // 🔴 Ya está siendo atendido por humano
      if (conversation?.status === 'in_progress') {
        return;
      }

      // ================================  
      // 📦 CONSULTA ESTADO / CHECK_REPAIR
      // ================================
      if (session.step === 'check_repair') {
        const handled = await checkRepairStatus(client, userId, text, originalText);
        if (handled) return;
      }

      // ================================  
      // 👋 SALUDO
      // ================================
      const isFirstMessage = !session.lastMessageAt;
      if (detectUserGreeting(text) || isFirstMessage) {
        updateSession(userId, { step: 'menu', fallbackCount: 0 });
        await botSend(client, userId, `👋 ${getTimeGreeting()} ${name}, somos *Electrosafe Quilmes*.`);
        await botSend(client, userId,
`Podés elegir un número o escribir lo que necesitás:

1️⃣ Reparar un electrodoméstico  
2️⃣ Consultar el estado de tu reparación  
3️⃣ Ver horarios y dirección  
4️⃣ Hablar con un asesor`);
        return;
      }

      // ================================  
      // 🔧 OPCIÓN 1: REPARACIÓN
      // ================================
      if (wantsRepair(text) || text === '1') {
        await botSend(client, userId,
`🔧 Podés cotizar tu reparación acá:
https://electrosafeweb.com/reparacion-electrodomesticos`);
        return;
      }

      // ================================  
      // 📦 OPCIÓN 2: CONSULTA ESTADO
      // ================================
      if (wantsRepairStatus(text) || text === '2') {
        updateSession(userId, { step: 'check_repair', fallbackCount: 0 });
        await botSend(client, userId,
`📦 Para consultar el estado de tu reparación necesitamos el código público que figura en tu ticket.
Ingresalo acá por favor 🙌
(Ejemplo: Ab3K9xYz)
Podés escribir *cancelar* para salir o *asesor* para hablar con un humano.`);
        return;
      }

      // ================================  
      // 🕒 OPCIÓN 3: UBICACIÓN
      // ================================
      if (wantsLocation(text) || text === '3') {
        await botSend(client, userId,
`📍 Av. Vicente López 770 - Quilmes

🕒 Lunes a Viernes 10 a 18 hs  
    Sábados 10 a 13 hs`);
        return;
      }

      // ================================  
      // 👤 OPCIÓN 4: HUMANO
      // ================================
      if (wantsHuman(text) || text === '4') {
        await escalateToHuman(client, userId);
        return;
      }

      // ================================  
      // 🔚 CIERRE
      // ================================
      if (wantsToClose(text)) {
        await botSend(client, userId, `Perfecto 😊\nSi necesitás algo más escribinos cuando quieras.`);
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
1️⃣ Reparar un electrodoméstico  
2️⃣ Consultar el estado de tu reparación  
3️⃣ Ver horarios y dirección  
4️⃣ Hablar con un asesor`);
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
¿En qué podemos ayudarte? Elegi una de las opciones:

1️⃣ Reparar un electrodoméstico  
2️⃣ Consultar el estado de tu reparación  
3️⃣ Ver horarios y dirección  
4️⃣ Hablar con un asesor`);

    } catch (err) {
      logger.error(`❌ Error en message: ${err.message}`);
    }
  });
}