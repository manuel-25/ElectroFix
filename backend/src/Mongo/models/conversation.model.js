import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'bot', 'human'],
    required: true
  },
  text: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const ConversationSchema = new mongoose.Schema({

  phone: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  /* 👤 Datos del contacto */
  contactName: {
    type: String,
    trim: true
  },

  /* 📝 Últimos mensajes */
  lastMessage: String,
  lastMessageAt: Date,

  lastCustomerMessage: String,
  lastCustomerMessageAt: Date,

  unreadCount: {
    type: Number,
    default: 0
  },

  /* 🤝 Estado humano */
  pendingHuman: {
    type: Boolean,
    default: false,
    index: true
  },

  status: {
    type: String,
    enum: ['bot', 'waiting', 'in_progress', 'waiting_customer', 'resolved'],
    default: 'bot',
    index: true
  },

  humanRequestedAt: Date,

  assignedTo: {
    type: String,
    default: null
  },
  
  inProgressAt: Date,

  priority: {
    type: Boolean,
    default: false
  },

  lastAssignedTo: String,

  messages: [MessageSchema]

}, { timestamps: true });

export default mongoose.model('Conversation', ConversationSchema);