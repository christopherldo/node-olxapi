const {
  checkSchema
} = require('express-validator');

const {
  StateService,
  AuthService,
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
  signUp: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O seu nome precisa ter pelo menos 2 caracteres',
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'O seu e-mail precisa ser um e-mail válido',
      custom: {
        options: async value => {
          if (await AuthService.getUserByEmail(value)) {
            throw new Error('Esse e-mail não está disponível para cadastro');
          };

          return true;
        },
      },
    },
    state: {
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
      isLength: {
        options: {
          min: 8,
        },
      },
      errorMessage: 'A senha precisa conter pelo menos 8 caracteres',
    },
    password_confirmation: {
      notEmpty: true,
      errorMessage: 'A confirmação da senha não pode estar vazia',
      custom: {
        options: (value, {
          req
        }) => {
          if (value !== req.body.password) {
            throw new Error('A confirmação da senha não é igual a senha');
          };

          return true;
        },
      },
    },
  }),
  signIn: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'O seu e-mail precisa ser um e-mail válido',
    },
    password: {
      notEmpty: true,
      errorMessage: 'O campo de senha não pode estar vazio',
    },
  }),
};