const {
  validationResult,
  matchedData
} = require('express-validator');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const {
  AuthService
} = require('../services');

const secret = process.env.JWT_SECRET;

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

    const passwordHash = await bcrypt.hash(data.password, 10);

    let public_id;

    do {
      public_id = uuid.v4();
    } while (await AuthService.getUserByPublicID(public_id));

    const newUser = {
      public_id,
      name: data.name,
      email: data.email,
      state: data.state,
      password: passwordHash,
    };

    const user = await AuthService.save(newUser);

    const token = jwt.sign({
      sub: user.public_id,
      name: user.name,
      iat: Date.now(),
    }, secret);

    res.status(200).send({
      user: {
        public_id: user.public_id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  },
};