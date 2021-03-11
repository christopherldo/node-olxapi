const {
  StateDAOMysql
} = require('../services');

const StateDao = StateDAOMysql;

module.exports = {
  getStates: async (req, res) => {
    const states = await StateDao.find();
    res.json({
      states
    });
  },
};