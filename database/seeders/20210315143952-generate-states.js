'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('States', [{
      name: 'Acre',
      uf: 'AC'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Alagoas',
      uf: 'AL'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Amapá',
      uf: 'AP'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Amazonas',
      uf: 'AM'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Bahia',
      uf: 'BA'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Ceará',
      uf: 'CE'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Distrito Federal',
      uf: 'DF'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Espírito Santo',
      uf: 'ES'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Goiás',
      uf: 'GO'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Maranhão',
      uf: 'MA'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Mato Grosso',
      uf: 'MT'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Mato Grosso do Sul',
      uf: 'MS'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Minas Gerais',
      uf: 'MG'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Pará',
      uf: 'PA'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Paraíba',
      uf: 'PB'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Paraná',
      uf: 'PR'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Pernambuco',
      uf: 'PE'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Piauí',
      uf: 'PI'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Rio de Janeiro',
      uf: 'RJ'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Rio Grande do Norte',
      uf: 'RN'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Rio Grande do Sul',
      uf: 'RS'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Rondônia',
      uf: 'RO'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Roraima',
      uf: 'RR'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Santa Catarina',
      uf: 'SC'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'São Paulo',
      uf: 'SP'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Sergipe',
      uf: 'SE'
    }]);
    await queryInterface.bulkInsert('States', [{
      name: 'Tocantins',
      uf: 'TO'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('States', null, {});
  },
};