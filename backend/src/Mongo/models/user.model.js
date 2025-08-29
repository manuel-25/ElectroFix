import mongoose from 'mongoose'
const { Schema, model } = mongoose
import { BRANCHES } from './service.model.js'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },

    branch: { type: String, enum: BRANCHES, default: null },
    role: { type: String, enum: ['admin', 'empleado', 'tecnico', 'supervisor'], default: 'empleado' },

    lastLoginAt: { type: Date, default: Date.now },
    loginCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    notes: { type: String }
  },
  {
    timestamps: true
  }
)

const UserModel = model('User', UserSchema)
export default UserModel
