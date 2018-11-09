const {ExtractJwt, Strategy} = require('passport-jwt');
const mongoose = require('mongoose');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_OR_PRIVATE_KEY,
};

const User = mongoose.model('User');

module.exports = (passport) => {
  passport.use(new Strategy(options, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload.id);

    if (!user) { return done(null, false); }

    return done(null, user);
  }));
};
