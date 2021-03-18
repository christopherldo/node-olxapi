'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
        name: 'Bebês',
        slug: 'baby'
      },
      {
        name: 'Carros',
        slug: 'cars',
      },
      {
        name: 'Roupas',
        slug: 'clothes',
      },
      {
        name: 'Eletrônicos',
        slug: 'electronics',
      },
      {
        name: 'Esportes',
        slug: 'sports',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};