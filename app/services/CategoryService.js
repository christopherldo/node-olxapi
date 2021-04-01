const {Category} = require('../models');

module.exports = {
  find: async () => {
    return await Category.findAll();
  },
  getSlugs: async () => {
    return await Category.findAll({
      attributes: ['slug'],
    });
  },
};