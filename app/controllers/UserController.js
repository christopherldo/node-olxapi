const {
  UserService,
  AdService,
  AdImageService
} = require('../services')

module.exports = {
  info: async (req, res) => {
    const user = req.user;

    const ads = await AdService.findByUserPublicID(user.public_id);

    const adList = [];

    for (let ad of ads) {
      const adImages = await AdImageService.findByAdPublicID(ad.public_id);

      const images = [];
      for (let image of adImages) {
        images.push({
          public_id: image.public_id,
          url: image.url,
          default: image.default,
        });
      };

      const adObject = {
        public_id: ad.public_id,
        category: ad.category,
        date_created: ad.date_created,
        title: ad.title,
        price: ad.price,
        price_negotiable: ad.price_negotiable,
        description: ad.description,
        views: ad.views,
        status: ad.status,
        images,
      };

      adList.push(adObject);
    };

    res.json({
      public_id: user.public_id,
      name: user.name,
      email: user.email,
      state: user.state,
      ads: adList,
    });
  },
  editAction: async (req, res) => {

  },
};