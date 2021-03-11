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
      state: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
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
        type: DataTypes.DECIMAL,
      },
      price_negotiable: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        default: 0,
      },
      description: {
        type: DataTypes.TEXT,
      },
      view: {
        allowNull: false,
        type: DataTypes.INTEGER,
        default: 0,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        default: 'active',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ads');
  }
};