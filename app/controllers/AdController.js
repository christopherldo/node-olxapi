const {
  validationResult,
  matchedData
} = require('express-validator');
const uuid = require('uuid');
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

    const ad = await AdService.getOne(public_id, true);

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
      json.images.push(`${req.protocol}://${req.get('host')}/upload/${image.url}`);
    };

    json.user_info = {
      public_id: user.public_id,
      name: user.name,
      email: user.email,
      state: user.state,
    };

    if (other === 'true') {
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
          image: `${req.protocol}://${req.get('host')}/upload/${(await AdImageService.getDefaultImage(ad.public_id)).url}`,
        };
        if (ad.public_id !== public_id) {
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
        image: `${req.protocol}://${req.get('host')}/upload/${(await AdImageService.getDefaultImage(ad.public_id)).url}`,
      };

      json.ads.push(ad);
    };

    res.send(json);
  },
  addAction: async (req, res) => {
    const imagesName = req.body.images;
    const user = req.user;

    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

    const data = matchedData(req);
    let price = 0;

    if (data.price_negotiable === 'false') {
      const priceArray = data.price.split(' ');
      const currency = priceArray[0];
      price = Number(priceArray[1].split('.').join('').replace(',', '.'));
    };

    do {
      public_id = uuid.v4();
    } while (await AdService.getOne(public_id, false));

    const newAd = {
      public_id,
      id_user: user.public_id,
      category: data.category,
      date_created: new Date().toISOString(),
      title: data.title,
      price,
      price_negotiable: data.price_negotiable,
      description: data.description,
    };

    imagesName.forEach(async imageName => {
      const newAdImage = {
        public_id: imageName.split('.')[0],
        ad_id: public_id,
        url: imageName,
        default: false,
      };
      
      if(imagesName.indexOf(imageName) === 0){
        newAdImage.default = true;
      };

      await AdImageService.save(newAdImage);
    });

    const ad = await AdService.save(newAd);

    res.send(ad);
  },
  editAction: async (req, res) => {

  },
};