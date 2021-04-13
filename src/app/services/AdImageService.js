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
  getDefaultImage: async ad_id => {
    return await AdImage.findOne({
      where: {
        ad_id,
        default: 1,
      },
    });
  },
  save: async adImageObject => {
    return await AdImage.create(adImageObject);
  },
};