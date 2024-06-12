const { Op } = require('sequelize');
const { Conversation } = require('../models');

const createConversation = async (req, res) => {
  // Your createConversation implementation
};

const getConversations = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;
  const where = search ? { summary: { [Op.like]: `%${search}%` } } : {};

  const { count, rows } = await Conversation.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  res.json({
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    data: rows
  });
};

module.exports = {
  createConversation,
  getConversations,
};
