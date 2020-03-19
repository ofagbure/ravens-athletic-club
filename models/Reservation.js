
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
    CourtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PlayerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Court, {foreignKey: 'CourtId'})
    Reservation.belongsTo(models.Player, {foreignKey: 'PlayerId'})
  };

  // Reservation.associate = models => {
  //   Reservation.belongsTo(models.Court, {
  //     // foreignKey: {
  //     //   allowNull: true,
  //     // }
  //   });
  //   Reservation.belongsTo(models.Player, {
  //     // foreignKey: {
  //     //   allowNull: true,
  //     // }
  //     });
  // };


  return Reservation;
};