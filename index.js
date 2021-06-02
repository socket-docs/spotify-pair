'use strict';
const app = require('./src/server');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app(process.env.PORT);
  })
  .catch(err => {
    console.log('Connection Failed ', err.message);
  });
