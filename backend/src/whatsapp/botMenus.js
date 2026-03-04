// ================================
// 🟢 MENÚ PRINCIPAL
// ================================

export function greeting(name, greeting) {
  return `
👋 ${greeting} ${name}, somos *Electrosafe Quilmes*.`;
}

export const mainMenu = `
Elegí una opción:

1️⃣ Reparar un electrodoméstico  
2️⃣ Consultar estado de reparación  
3️⃣ Ver horarios y dirección  
4️⃣ Hablar con un asesor
5️⃣ Solicitar informe técnico para seguro

Respondé con el número.
`;

// ================================
// 📦 CONSULTA ESTADO
// ================================

export const askRepairCode = `
📦 Para consultar el estado de tu reparación necesitamos el código público que figura en tu ticket.

Ingresalo acá por favor 🙌
(Ejemplo: Ab3K9xYz)

Podés escribir *cancelar* para salir o *asesor* para hablar con un humano.
`;

export const invalidRepairCodeMessage = `
❌ Código inválido.

Ingresalo nuevamente o escribí *cancelar* para volver al menú.
`;

export const repairNotFoundMessage = `
❌ No encontramos un servicio con ese código.

Verificá que esté bien escrito.

Si querés salir escribí *cancelar*.  
Si necesitás ayuda, escribí *asesor* y te ayudamos personalmente 🙌
`;

export function repairStatusMessage(service) {
  return `
📦 Estado de tu equipo:

🔧 Equipo: ${service.device || service.equipmentType}
🏷 Marca: ${service.brand}
📊 Estado: ${service.status}

Si tenés dudas podés escribir *asesor* para hablar con un humano.
`;
}

// ================================
// 📍 UBICACIÓN
// ================================

export const locationMessage = `
📍 Av. Vicente López 770 - Quilmes

🕒 Horarios:
Lunes a Viernes 10 a 18 hs  
Sábados 10 a 13 hs
`;

// ================================
// 👤 HUMANO
// ================================

export const humanMessage = `
👤 Un asesor humano te responderá a la brevedad.

Mientras tanto, podés dejar detallada tu consulta 🙌

Escribí *cancelar* si querés volver al menú.
`;

// ================================
// ❌ CANCELACIÓN
// ================================

export const cancelMessage = `
❌ Operación cancelada.

Volvemos al menú principal 👇
`;

// ================================
// 🙏 AGRADECIMIENTO
// ================================

export const thanksMessage = `
😊 ¡Gracias a vos!
`;

// ================================
// 😕 FRUSTRACIÓN
// ================================

export const frustrationMessage = `
Perdón si no fui claro 🙏`;

// ================================
// 🤔 FALLBACK
// ================================

export const fallbackMessage = `
No estoy seguro de haber entendido 🤔
¿En qué podemos ayudarte? Escribí asesor si necesitas ayuda.`;

// Informes Técnicos
export const technicalReportMessage = `
📝 Realizamos *informes técnicos* para compañías de seguro.

Para generar el informe necesitamos los siguientes datos:

• *Nombre y Apellido*:
• *DNI*:  
• *Domicilio completo*:  
• *Teléfono de contacto*:  
• *Marca y modelo del equipo*:  
• *Descripción del problema*:  
• *Fotos del equipo* (si es posible):

Un asesor va a revisar la información y continuar el proceso 📄

Escribí *cancelar* para volver al menú.
`;