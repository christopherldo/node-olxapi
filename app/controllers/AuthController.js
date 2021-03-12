const {
  validationResult,
  matchedData
} = require('express-validator');

module.exports = {
  signIn: async (req, res) => {

  },
  signUp: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

    const data = matchedData(req);

    res.status(200).send({
      data
    });
  },
};