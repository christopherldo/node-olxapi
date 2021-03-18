const {Category} = require('../models');

module.exports = {
  find: async () => {
    return await Category.findAll();
  },
};