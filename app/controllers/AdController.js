const {AdService, AdImageService} = require('../services');

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
      const images = await AdImageService.findByAdPublicID(public_id);
      for(let image of images){
        json.images.push(image.url);
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