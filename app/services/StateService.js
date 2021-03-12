const {State} = require('../models');

module.exports = {
  find: async () => {
    return await State.findAll();
  },
  getUFs: async () => {
    return await State.findAll({
      attributes: ['uf'],
    });
  },
};