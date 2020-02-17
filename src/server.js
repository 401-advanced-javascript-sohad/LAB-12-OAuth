
/* eslint-disable strict */
'use strict';
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Require Resourses
const router = require('./lib/routes.js');
const notFound = require( './middleware/404.js' );
const errorHandler = require( './middleware/500.js');



const authRouter = require('../src/lib/routes.js');
const apiRouter = require('../routes/v1.js');

// express app 

const app = express();

app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(router);
app.use(express.static('./public'));

// app using
app.use(notFound);
app.use(errorHandler);




// Server listen 
module.exports = {
  server : app,
  start : port => {
    let PORT = port || process.env.PORT || 3002;
    app.listen(PORT , ()=> console.log(`I am Listening ${PORT}`));
  },
};




////************************************************************************************** */
