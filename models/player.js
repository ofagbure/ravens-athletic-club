
const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Player = sequelize.define('Player', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    need_partner: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    skill_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      }
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });
  

  Player.associate = function(models) {
    Player.belongsTo(models.User, {foreignKey: 'PlayerId'})
    Player.hasMany(models.Reservation, {onDelete: "cascade"})
  };

  return Player;
};