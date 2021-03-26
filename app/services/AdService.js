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
    return await Ad.findAll({
      attributes: [
        'public_id',
        'title',
        'price',
        'price_negotiable',
      ],
      order: [
        ['date_created', 'DESC'],
      ],
      limit: options.limit,
    });
  },
  getOne: async public_id => {
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
};