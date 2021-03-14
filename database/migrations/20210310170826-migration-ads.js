'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ads', {
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
      id_user: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      date_created: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      price_negotiable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT,
      },
      views: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'active',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ads');
  }
};