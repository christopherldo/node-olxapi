const {
  checkSchema
} = require('express-validator');

const {
  StateService,
  UserService,
} = require('../services');

const statesArray = [];

const getUFs = async () => {
  let states = await StateService.getUFs();

  states.forEach(stateObject => {
    statesArray.push(stateObject.uf);
  });
};

getUFs();

module.exports = {
  editAction: checkSchema({
    name: {
      optional: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O seu nome precisa ter pelo menos 2 caracteres',
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'O seu e-mail precisa ser um e-mail válido',
      custom: {
        options: async (value, {
          req
        }) => {
          const user = await UserService.getUserByEmail(value);
          if (user) {
            if (user.public_id !== req.user.public_id) {
              throw new Error('Esse e-mail não está disponível para cadastro');
            };

            return true;
          };

          return true;
        },
      },
    },
    state: {
      optional: true,
      isLength: {
        options: {
          min: 2,
          max: 2,
        },
      },
      custom: {
        options: (value) => {
          if (statesArray.includes(value) === false) {
            throw new Error('O estado informado não é um UF válido');
          };

          return true;
        },
      },
      errorMessage: 'Você precisa fornecer o UF de um estado brasileiro',
    },
    password: {
      optional: true,
      isLength: {
        options: {
          min: 8,
        },
      },
      errorMessage: 'A senha precisa conter pelo menos 8 caracteres',
    },
    password_confirmation: {
      errorMessage: 'A confirmação da senha não pode estar vazia',
      custom: {
        options: (value, {
          req
        }) => {
          if (req.body.password === undefined){
            return true;
          };

          if (value !== req.body.password) {
            throw new Error('A confirmação da senha não é igual a senha');
          };

          return true;
        },
      },
    },
  }),
};