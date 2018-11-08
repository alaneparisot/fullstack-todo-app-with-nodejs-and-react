const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

require('./config/config');

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Unable to connect to MongoDB', err));

app.listen(
  process.env.PORT,
  () => console.log(`Server is running on port ${process.env.PORT}`)
);