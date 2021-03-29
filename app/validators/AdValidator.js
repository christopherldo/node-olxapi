const {
  checkSchema
} = require('express-validator');

const {
  AdService,
} = require('../services');

module.exports = {
  getItem: checkSchema({
    id: {
      isUUID: true,
      errorMessage: 'O id público do produto precisa ser um UUID válido',
      custom: {
        options: async value => {
          if (await AdService.getOne(value) === null) {
            throw new Error('Produto não encontrado');
          };

          return true;
        },
      },
    },
    other: {
      optional: true,
      isBoolean: true,
      errorMessage: 'O atributo other deve conter o valor true ou false',
    },
  }),
};