const {
  StateService,
} = require('../services');

module.exports = {
  getStates: async (req, res) => {
    const states = await StateService.find();
    res.json({
      states
    });
  },
};