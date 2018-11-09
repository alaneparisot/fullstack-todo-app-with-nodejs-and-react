const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

const router = express.Router();

router.get('/current', passport.authenticate('jwt', {session: false}),
  (req, res) => res.json({
    id: req.user.id,
    email: req.user.email,
  })
);

router.post('/login', async (req, res) => {
  const errMsg = 'Invalid email or password';

  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) { return res.status(400).json({msg: errMsg}); }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) { return res.status(400).json({msg: errMsg}); }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const secretOrPrivateKey = process.env.JWT_SECRET_OR_PRIVATE_KEY;

    const options = {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION_DELAY
    };

    const token = await jwt.sign(payload, secretOrPrivateKey, options);

    res.json({token});
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (user) {
      return res.status(400).json({msg: 'Email already registered'});
    }

    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      password: hash,
    });

    const {id, email} = await newUser.save();

    res.json({id, email});
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;