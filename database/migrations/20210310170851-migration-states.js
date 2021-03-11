'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('States', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING(2),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('States');
  }
};