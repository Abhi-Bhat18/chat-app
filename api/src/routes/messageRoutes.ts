import express from 'express';
import { getMessages , createOrGetConversation } from '../controllers/messageController';

const router = express.Router();

router.post('/conversation', createOrGetConversation);

router.get('/:covnId',getMessages);

export default router