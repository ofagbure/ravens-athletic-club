'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      need_partner: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      skill_level: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      courtId : {
        type: Sequelize.INTEGER,
        references: {
          model: 'courts',
          key: 'id',
          as: 'courtId',
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Players');
  }
};