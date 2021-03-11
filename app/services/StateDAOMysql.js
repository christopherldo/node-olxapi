const {State} = require('../models');

module.exports = {
  find: async () => {
    return await State.findAll();
  },
};