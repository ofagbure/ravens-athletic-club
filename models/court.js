
const Sequelize = require("sequelize");



module.exports = function(sequelize, DataTypes) {
const Court = sequelize.define('Court', {
    court_numb:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Court.associate = function(models) {
    Court.belongsToMany(models.Player, {through: 'Reservation', foreignKey: 'PlayerId'})
  };

  Court.addHook("afterCreate", function(user) {
    Court.bulkCreate(data);

  });



    return Court;
};
