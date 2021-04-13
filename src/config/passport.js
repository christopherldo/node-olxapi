require('dotenv').config();

const {
  Passport
} = require('passport');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const {
  UserService
} = require('../app/services');

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, async (payload, done) => {
    const user = await UserService.getUserByPublicID(payload.sub);

    if (user) {
      return done(null, user);
    } else {
      return done(new Error('Usuário não encontrado'));
    };
  }),
);