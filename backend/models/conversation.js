module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {});
    return Conversation;
  };
  