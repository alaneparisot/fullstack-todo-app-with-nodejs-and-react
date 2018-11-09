const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('./config/config');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Unable to connect to MongoDB', err));

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', require('./routes/user'));

app.use(passport.initialize());
require('./config/passport')(passport);

app.listen(
  process.env.PORT,
  () => console.log(`Server is running on port ${process.env.PORT}`)
);