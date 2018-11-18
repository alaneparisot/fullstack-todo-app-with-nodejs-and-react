const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

require('./config/config');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Unable to connect to MongoDB', err));

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', require('./routes/user'));
app.use('/api/todo', require('./routes/todo'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(passport.initialize());
require('./config/passport')(passport);

app.listen(
  process.env.PORT,
  () => console.log(`Server is running on port ${process.env.PORT}`)
);