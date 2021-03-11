require('dotenv').config();

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = {
  private: async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token) return res.status(401).send({
      error: 'Nenhum token foi enviado, faça login',
    });

    jwt.verify(token, secret, err => {
      if(err) return res.status(500).send({
        error: 'Não foi possível decodificar seu token.',
      });

      next();
    });
  },
};