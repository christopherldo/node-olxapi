const {AdService, AdImageService, UserService} = require('../services');

module.exports = {
  getItem: async (req, res) => {
    const body = req.query;

    const public_id = body.id;
    const other = body.other;

    const ad = await AdService.getOne(public_id);

    const json = {
      ...ad.dataValues,
    };

    if(other === 'true'){
      json.images = [];
      
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

      for(let image of images){
        json.images.push(image.url);
      };

      json.user_info = {
        public_id: user.public_id,
        name: user.name,
        email: user.email,
        state: user.state,
      };
    };

    res.send(json);
  },
  getList: async (req, res) => {
    const body = req.query;
    
    const sort = body.sort;
    const limit = Number(body.limit);

    const options = {
      sort,
      limit,
    };

    const ads = await AdService.getList(options);

    const json = {
      ads: [],
    };

    for(let ad of ads){
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