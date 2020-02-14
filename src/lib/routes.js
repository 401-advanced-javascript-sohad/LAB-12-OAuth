'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./users.js');
const basicAuth = require('../lib/basic-auth.js');
const oauth = require('../lib/oauth.js');
const barearOauth = require('./barear-auth-middleware.js');

//////////////////////////////////signup///////////////////////////////////////////////


router.post('/signup', (req, res) => {
  let user = new Users(req.body);
  user.save(req.body)
    .then(userData => {
      let token = user.generateToken(userData);
      res.status(200).send(token);
    })
    .catch(err => console.error(err));
});


///////////////////////////////////signin///////////////////////////////////

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});


/////////////////////////////////////users/////////////////////////////////////

router.get('/users',basicAuth,(req, res) => {
  Users.list()
    .then(userData=>{
      res.status(200).json(userData);
    });
});

////////////////////////////////////oauth////////////////////////////////////////

router.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
});
router.get('/user',barearOauth, (req,res)=>{
  res.status(200).json(req.user);
});

module.exports = router;

