const {validationResult} = require('express-validator');
const sharp = require('sharp');
const uuid = require('uuid');

module.exports = {
  resizeImages: async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      next();
      return;
    };

    if (req.files === null) {
      next();
      return;
    };

    req.body.images = [];
    const images = [];

    if (Array.isArray(req.files.image)) {
      req.files.image.forEach(image => {
        images.push(image);
      });
    } else {
      images.push(req.files.image);
    };

    await Promise.all(
      images.map(async file => {
        const newFilename = `${uuid.v4()}.webp`;
        await sharp(file.data)
          .resize(500, 500)
          .toFormat("webp")
          .webp()
          .toFile(`${__dirname}/../../public/upload/${newFilename}`);
        req.body.images.push(newFilename);
      }),
    );

    next();
  },
};