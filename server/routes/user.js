const bcrypt = require('bcryptjs');
const express = require('express');

const User = require('../models/User');

const router = express.Router();

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