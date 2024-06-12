const express = require('express');
const router = express.Router();
const { Conversation } = require('../models');

router.get('/', async (req, res) => {
  const conversations = await Conversation.findAll();
  res.render('admin', { conversations });
});

module.exports = router;
