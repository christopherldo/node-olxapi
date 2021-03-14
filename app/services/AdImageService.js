const {
  AdImage
} = require('../models');

module.exports = {
  findByAdPublicID: async ad_id => {
    return await AdImage.findAll({
      where: {
        ad_id,
      },
    });
  },
};