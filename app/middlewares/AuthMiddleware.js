require('dotenv').config();

const passport = require('passport');

module.exports = {
  private: passport.authenticate('jwt', {
    session: false
  }),
};