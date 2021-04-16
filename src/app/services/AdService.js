const {
  Ad
} = require('../models');

module.exports = {
  findByUserPublicID: async id_user => {
    return await Ad.findAll({
      where: {
        id_user,
      },
    });
  },
  getList: async options => {
    return await Ad.findAndCountAll({
      attributes: [
        'public_id',
        'title',
        'price',
        'price_negotiable',
      ],
      ...options,
    });
  },
  getOne: async (public_id, increment) => {
    if(increment) {
      await Ad.increment('views', {
        by: 1,
        where: {
          public_id,
        },
      });
    };
    return await Ad.findOne({
      attributes: [
        'public_id',
        'id_user',
        'category',
        'date_created',
        'title',
        'price',
        'price_negotiable',
        'description',
        'views',
        'status',
      ],
      where: {
        public_id,
      },
    });
  },
  save: async adObject => {
    return await Ad.create(adObject);
  },
  reset: async () => {
    const ads = await Ad.findAll();

    ads.forEach(async ad => {
      await ad.destroy();
    });
  },
};