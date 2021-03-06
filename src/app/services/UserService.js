const {
  User
} = require('../models');

module.exports = {
  getUserByEmail: async email => {
    return await User.findOne({
      where: {
        email,
      },
    });
  },
  getUserByPublicID: async public_id => {
    return await User.findOne({
      where: {
        public_id,
      },
    });
  },
  findOneAndUpdate: async userObject => {
    return await User.update(userObject, {
      where: {
        public_id: userObject.public_id,
      },
    });
  },
};