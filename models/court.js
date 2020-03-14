// 'use strict';
// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.


module.exports = function(sequelize, DataTypes) {
const Court = sequelize.define('Court', {
    court_numb:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    }
  });
    return Court;
};
