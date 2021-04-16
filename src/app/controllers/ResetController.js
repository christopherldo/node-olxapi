const {
  AdService,
  AdImageService,
} = require('../services');

module.exports = {
  resetAdsOnStart: async () => {
    const imagesPromise = new Promise((resolve, reject) => {
      resolve(AdService.reset());
    });

    const adsPromise = new Promise((resolve, reject) => {
      resolve(AdImageService.reset());
    });

    await Promise.all([
      imagesPromise,
      adsPromise
    ]);
  },
};