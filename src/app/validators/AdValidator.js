const {
  checkSchema
} = require('express-validator');

const {
  AdService,
  CategoryService,
  StateService,
} = require('../services');

const getUFs = () => {
  const statesArray = [];
  let states = StateService.getUFs();

  states.forEach(stateObject => {
    statesArray.push(stateObject.uf);
  });

  return statesArray;
};

module.exports = {
  getList: checkSchema({
    sort: {
      optional: true,
      in: [
        'asc', 'desc',
      ],
      errorMessage: 'A ordem só pode ser ASC ou DESC',
    },
    limit: {
      optional: true,
      isFloat: {
        min: 1,
        max: 15,
      },
      toInt: true,
      errorMessage: 'O limite máximo de anúncios por requisição é 15 e o mínimo é 1',
    },
    q: {
      trim: true,
      optional: true,
    },
    cat: {
      optional: true,
      custom: {
        options: async value => {
          if (value) {
            const categoriesDatabase = await CategoryService.getSlugs();
            const categories = [];

            for (category of categoriesDatabase) {
              categories.push(category.slug);
            };

            if (categories.includes(value) === false) {
              throw new Error('A categoria informada não foi encontrada na base de dados');
            };

            return true;
          };
        },
      },
    },
    state: {
      optional: true,
      custom: {
        options: (value) => {
          if (value) {
            console.log(value)
            const statesArray = getUFs();

            if (statesArray.includes(value) === false) {
              throw new Error('O estado informado não é um UF válido');
            };
          };

          return true;
        },
      },
    },
    offset: {
      optional: true,
      isNumeric: true,
      toInt: true,
    },
  }),
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
  addAd: checkSchema({
    title: {
      trim: true,
      isLength: {
        options: {
          min: 5,
          max: 50,
        },
      },
      errorMessage: 'O título precisa ter pelo menos 5 caracteres e pode conter até 50',
    },
    category: {
      notEmpty: true,
      errorMessage: 'A categoria precisa ser preenchida e dentro das opções',
      custom: {
        options: async value => {
          const categoriesDatabase = await CategoryService.getSlugs();
          const categories = [];

          for (category of categoriesDatabase) {
            categories.push(category.slug);
          };

          if (categories.includes(value) === false) {
            throw new Error('A categoria informada não foi encontrada na base de dados');
          };

          return true;
        },
      },
    },
    price: {
      trim: true,
      errorMessage: 'O preço possui um valor incorreto',
      custom: {
        options: (value, {
          req
        }) => {
          if (req.body.price_negotiable === 'true') {
            return true;
          } else {
            if (value === '') {
              throw new Error('O campo de preço não foi preenchido');
            };
          };

          const priceArray = value.split(' ');
          const currency = priceArray[0];
          const price = Number(priceArray[1].split('.').join('').replace(',', '.'));

          if (priceArray.length !== 2) {
            throw new Error('O preço possui um valor incorreto');
          };

          if (currency !== 'R$') {
            throw new Error('O padrão de moeda tem que estar no formato de real brasileiro');
          };

          if (isNaN(price) || Number.isFinite(price) === false) {
            throw new Error('O preço não é um valor numérico');
          };

          if (price < 0) {
            throw new Error('O preço precisa ser um valor numérico positivo');
          };

          return true;
        },
      },
    },
    price_negotiable: {
      isBoolean: true,
      errorMessage: 'O campo de preço negociável é obrigatório',
    },
    description: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: {
          max: 500,
        },
      },
      errorMessage: 'O campo de descrição não pode estar vazio e não pode ultrapassar 500 caracteres',
    },
    image: {
      custom: {
        options: (value, {
          req
        }) => {
          if (req.files === null || req.files.image === undefined) {
            throw new Error('É obrigatório enviar pelo menos uma imagem do produto');
          };

          const images = [];
          const acceptedMimes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/webp'
          ];

          if (Array.isArray(req.files.image)) {
            req.files.image.forEach(image => {
              images.push(image);
            });
          } else {
            images.push(req.files.image);
          };

          if (images.length > 10) {
            throw new Error('Só é permitido o envio de no máximo 10 imagens');
          };

          for (let image of images) {
            if (image.size > 10000000) {
              throw new Error('As imagens enviadas precisam conter tamanho inferior a 10MB');
            };
            if (acceptedMimes.includes(image.mimetype) === false) {
              throw new Error('Os arquivos de imagem enviados não estão em um formato suportado');
            };
          };

          return true;
        },
      },
    },
  }),
};