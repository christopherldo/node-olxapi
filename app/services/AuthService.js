const {
  User
} = require('../models');

module.exports = {
  save: async userObject => {
    return await User.create(userObject);
  },
};