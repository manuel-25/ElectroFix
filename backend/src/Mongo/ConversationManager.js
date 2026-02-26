import Conversation from './models/conversation.model.js';

class ConversationManager {

  async createOrUpdate(phone, updateData = {}) {
    return await Conversation.findOneAndUpdate(
      { phone },
      { phone, ...updateData },
      { upsert: true, new: true }
    );
  }

  async getAll() {
    return await Conversation.find().sort({ humanRequestedAt: 1 }).lean();
  }

  async getByPhone(phone) {
    return await Conversation.findOne({ phone });
  }

  async getPendingHumans() {
    return await Conversation.find({ pendingHuman: true }).sort({ humanRequestedAt: 1 });
  }

  async getPendingHumanCount() {
    return await Conversation.countDocuments({ pendingHuman: true });
  }

  async setPending(phone, value) {
    const update = { pendingHuman: value };
    if (value) update.humanRequestedAt = new Date();
    return await Conversation.findOneAndUpdate({ phone }, update, { new: true });
  }

  async setHumanRequestedAt(phone, date) {
    return await Conversation.findOneAndUpdate(
      { phone },
      { humanRequestedAt: date },
      { new: true }
    );
  }

  async setPriority(phone, value) {
    return await Conversation.findOneAndUpdate(
      { phone },
      { priority: value },
      { new: true }
    );
  }

  async resetUnread(phone) {
    return await Conversation.findOneAndUpdate(
      { phone },
      { unreadCount: 0 },
      { new: true }
    );
  }

  async resolveConversation(phone) {
    return await Conversation.findOneAndUpdate(
      { phone },
      {
        pendingHuman: false,
        humanRequestedAt: null,
        unreadCount: 0,
        assignedTo: null,
        status: 'resolved'
      },
      { new: true }
    );
  }

  async addMessage(phone, message) {
    let conversation = await Conversation.findOne({ phone });

    if (!conversation) {
      // Si no existe, crea nueva
      return Conversation.create({
        phone,
        messages: [message],
        lastMessage: message.text,
        lastMessageAt: new Date(),
        lastCustomerMessage: message.sender === 'user' ? message.text : undefined,
        lastCustomerMessageAt: message.sender === 'user' ? new Date() : undefined,
        unreadCount: message.sender === 'user' ? 1 : 0,
        status: 'bot'
      });
    }

    // ✅ Reinicio si estaba resuelta y llega mensaje del usuario
    if (conversation.status === 'resolved' && message.sender === 'user') {
      conversation.status = 'bot';
      conversation.pendingHuman = false;
      conversation.assignedTo = null;
      conversation.unreadCount = 1;
      conversation.messages = [];   //borra el historial de mensajes opcional cambiarlo
    }

    conversation.messages.push(message);
    conversation.lastMessage = message.text;
    conversation.lastMessageAt = new Date();

    if (message.sender === 'user') {
      conversation.unreadCount += 1;
      conversation.lastCustomerMessage = message.text;
      conversation.lastCustomerMessageAt = new Date();
    } else if (message.sender === 'human') {
      conversation.unreadCount = 0;
    }

    await conversation.save();
    return conversation;
  }

  async assignToUser(phone, email) {
    const updated = await Conversation.findOneAndUpdate(
      { phone },
      {
        status: 'in_progress',
        assignedTo: email,
        inProgressAt: new Date(),
      },
      { new: true }
    );

    if (!updated) console.log('No se encontró la conversación con phone:', phone);
    else console.log('Conversación tomada:', updated._id, updated.phone, 'Asignado a:', email);

    return updated;
  }
}

export default new ConversationManager();