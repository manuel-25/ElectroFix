import Conversation from './models/conversation.model.js';

class ConversationManager {

  async createOrUpdate(phone, updateData) {

    return await Conversation.findOneAndUpdate(
      { phone },
      {
        phone,
        ...updateData
      },
      {
        upsert: true,
        new: true
      }
    );
  }

  async getByPhone(phone) {
    return await Conversation.findOne({ phone });
  }

  async setPending(phone, value) {
    return await Conversation.updateOne(
      { phone },
      { pendingHuman: value }
    );
  }

  async resetUnread(phone) {
    return await Conversation.updateOne(
      { phone },
      { unreadCount: 0 }
    );
  }

  async incrementUnread(phone) {
    return await Conversation.updateOne(
      { phone },
      { $inc: { unreadCount: 1 } }
    );
  }

  async addBotMessage(phone, botMessage) {
    return await Conversation.updateOne(
      { phone },
      { $push: { botMessages: botMessage } }
    );
  }

  async setHumanRequestedAt(phone, date) {
  return Conversation.findOneAndUpdate(
    { phone },
    { humanRequestedAt: date },
    { new: true }
  );

  
}

async setPriority(phone, value) {
  return await Conversation.updateOne(
    { phone },
    { priority: value }
  );
}

async setApologySent(phone, value) {
  return await Conversation.updateOne(
    { phone },
    { apologySent: value }
  );
}

async setWaitingSince(phone, date) {
  return await Conversation.updateOne(
    { phone },
    { waitingSince: date }
  );
}

}

export default new ConversationManager();