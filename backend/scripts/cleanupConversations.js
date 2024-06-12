const { Sequelize, Op } = require('sequelize');
const { Conversation } = require('../models');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

async function cleanupOldConversations() {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - 30);

  const result = await Conversation.destroy({
    where: {
      createdAt: {
        [Op.lt]: thresholdDate
      }
    }
  });

  console.log(`Deleted ${result} old conversations`);
}

sequelize.sync().then(cleanupOldConversations);
