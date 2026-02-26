import ConversationManager from '../Mongo/ConversationManager.js';

class ConversationController {

  // 🔴 Conteo pendientes humano
  static async getPendingHumanCount(req, res) {
    try {
      const count = await ConversationManager.getPendingHumanCount();
      res.json({ count });
    } catch (error) {
      console.error('Error contando conversaciones', error);
      res.status(500).json({ error: 'Error al contar conversaciones' });
    }
  }

  // 📋 Obtener todas (para dashboard)
  static async getAll(req, res) {
    try {
      const conversations = await ConversationManager.getAll();
      res.json(conversations);
    } catch (error) {
      console.error('Error al obtener conversaciones', error);
      res.status(500).json({ error: 'Error al obtener conversaciones' });
    }
  }

  // ✅ Resolver conversación
  static async resolve(req, res) {
    try {
      const { phone } = req.params;
      const updated = await ConversationManager.resolveConversation(phone);
      res.json(updated);
    } catch (error) {
      console.error('Error resolviendo conversación', error);
      res.status(500).json({ error: 'Error al resolver conversación' });
    }
  }

  // 🟢 Tomar conversación (poner en gestión)
  static async takeConversation(req, res) {
    try {
        console.log('📞 Request para tomar conversación:', req.params.phone);
        console.log('👤 Usuario logueado:', req.user);

        if (!req.user) {
            console.log('❌ No hay usuario logueado');
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const email = req.user.email;
        const { phone } = req.params;

        const updated = await ConversationManager.assignToUser(phone, email);

        if (!updated) {
            console.log('❌ Conversación no encontrada en manager');
            return res.status(404).json({ error: 'Conversación no encontrada' });
        }

        console.log('✅ Conversación tomada:', updated._id, updated.status, updated.assignedTo);
        res.json(updated);

    } catch (error) {
        console.error('❌ Error tomando conversación', error);
        res.status(500).json({ error: 'Error al tomar conversación' });
    }
  }

}

export default ConversationController;