const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage
});

const Conversation = require('./conversation')(sequelize, DataTypes);
const UploadedFile = require('./uploadedFile')(sequelize, DataTypes);

sequelize.sync();

module.exports = {
  sequelize,
  Conversation,
  UploadedFile
};
