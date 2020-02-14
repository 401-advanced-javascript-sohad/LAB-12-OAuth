'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
const server = require('./src/server.js');

const MONGOOSE_URI='mongodb://localhost:27017/lab-12';

// Start up DB Server
const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONGOOSE_URI, options);
server.start(process.env.PORT);
server.start();