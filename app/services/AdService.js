const {
  Ad
} = require('../models');

module.exports = {
  findByUserPublicID: async (id_user) => {
    return await Ad.findAll({
      where: {
        id_user,
      },
    });
  },
};