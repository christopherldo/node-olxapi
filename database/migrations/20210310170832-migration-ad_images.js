'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ad_Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      public_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
      },
      ad_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      default: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ad_Images');
  }
};