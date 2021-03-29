const {
  validationResult,
  matchedData
} = require('express-validator');
const {
  AdService,
  AdImageService,
  UserService
} = require('../services');

module.exports = {
  getItem: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

   const data = matchedData(req);

    const public_id = data.id;
    const other = data.other;

    const ad = await AdService.getOne(public_id);

    const json = {
      ...ad.dataValues,
      images: [],
      user_info: {},
    };

    const imagesPromise = new Promise((resolve, reject) => {
      resolve(AdImageService.findByAdPublicID(public_id));
    });

    const userPromise = new Promise((resolve, reject) => {
      resolve(UserService.getUserByPublicID(ad.id_user));
    });

    const [images, user] = await Promise.all([
      imagesPromise,
      userPromise,
    ]);

    for (let image of images) {
      json.images.push(image.url);
    };

    json.user_info = {
      public_id: user.public_id,
      name: user.name,
      email: user.email,
      state: user.state,
    };

    if(other === 'true'){
      const options = {
        order: [
          ['date_created', 'DESC'],
        ],
        limit: 9,
        where: {
          id_user: user.public_id,
        },
      };
  
      const ads = await AdService.getList(options);

      json.others = [];

      for (let ad of ads) {
        ad = {
          ...ad.dataValues,
          image: (await AdImageService.getDefaultImage(ad.public_id)).url,
        };
        if(ad.public_id !== public_id){
          json.others.push(ad);
        };
      };
    };

    res.send(json);
  },
  getList: async (req, res) => {
    const body = req.query;

    const sort = body.sort;
    const limit = Number(body.limit);

    const options = {
      order: [
        ['date_created', 'DESC'],
      ],
      limit,
    };

    const ads = await AdService.getList(options);

    const json = {
      ads: [],
    };

    for (let ad of ads) {
      ad = {
        ...ad.dataValues,
        image: (await AdImageService.getDefaultImage(ad.public_id)).url,
      };

      json.ads.push(ad);
    };

    res.send(json);
  },
  addAction: async (req, res) => {

  },
  editAction: async (req, res) => {

  },
};