import ConversationManager from '../Mongo/ConversationManager.js';

class ConversationController {
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
        if (!req.user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const email = req.user.email;
        const { phone } = req.params;

        // Asignar al usuario y setear firstResponseAt
        const updated = await ConversationManager.assignToUser(phone, email, new Date());

        if (!updated) {
            return res.status(404).json({ error: 'Conversación no encontrada' });
        }

        res.json(updated);

    } catch (error) {
        console.error('❌ Error tomando conversación', error);
        res.status(500).json({ error: 'Error al tomar conversación' });
    }
  }

  // 🔔 Conteo para Sidebar
  static async getSidebarCounts(req, res) {
    try {
      const counts = await ConversationManager.getSidebarCount();
      res.json(counts);
    } catch (error) {
      console.error('Error obteniendo conteo sidebar', error);
      res.status(500).json({ error: 'Error al obtener conteos' });
    }
  }

}

export default ConversationController;