
const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Reservation = sequelize.define('Reservation', {
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    partner: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    CourtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PlayerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PlayerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PartnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PartnerName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Player, {foreignKey: 'PlayerId'})
  };

  return Reservation;
};