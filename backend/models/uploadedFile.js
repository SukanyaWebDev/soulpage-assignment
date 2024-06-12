module.exports = (sequelize, DataTypes) => {
    const UploadedFile = sequelize.define('UploadedFile', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {});
    return UploadedFile;
  };
  