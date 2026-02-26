import express from 'express'
import authenticateJWT from '../middlewares/authenticateJWT.js'
import ConversationController from '../controllers/conversationController.js'

const router = express.Router()

router.get('/', authenticateJWT, ConversationController.getAll)

router.get('/count/pending-human', authenticateJWT, ConversationController.getPendingHumanCount)

router.post('/:phone/resolve', authenticateJWT, ConversationController.resolve)

router.post('/:phone/take', authenticateJWT, ConversationController.takeConversation)

export default router