const express = require('express');
const router = express.Router();
const { createConversation, getConversations } = require('../controllers/conversationController');

router.get('/', getConversations);
router.post('/', createConversation);

module.exports = router;
