const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const middlewares = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let middlewareName = file.split('.')[0];
    const middleware = require(path.join(__dirname, file));
    middlewares[middlewareName] = middleware;
  });

module.exports = middlewares;