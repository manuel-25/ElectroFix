import mongoose from 'mongoose';

const BotMessageSchema = new mongoose.Schema({
  messageId: String,
  text: String,
  sentAt: Date
}, { _id: false });

const ConversationSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  lastMessage: String,
  lastMessageAt: Date,
  unreadCount: { type: Number, default: 0 },
  pendingHuman: { type: Boolean, default: false },
  priority: { type: Boolean, default: false },
  apologySent: { type: Boolean, default: false },
  botMessages: [BotMessageSchema]
}, { timestamps: true });

export default mongoose.model('Conversation', ConversationSchema);