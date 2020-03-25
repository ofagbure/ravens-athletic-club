
const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
const Image = sequelize.define('Image', {
    image_url:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
    return Image;
};
