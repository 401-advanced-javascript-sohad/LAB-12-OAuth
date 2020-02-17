
'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./users.js');
const basicAuth = require('../lib/basic-auth.js');
const oauth = require('../lib/oauth.js');
const barearOauth = require('./barear-auth-middleware.js');
const accessCL = require('./acl-middleware.js');


//////////////////////////////////signup///////////////////////////////////////////////


router.post('/signup', (req, res) => {
  let user = new Users(req.body);
  user.save()
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



router.get('/public', (req, res) => {
  Users.list()
    .then(userData=>{
      res.status(200).json(userData);
    });
  
});

///////////////////////////////////////////////////////////////////////////////
 

router.get('/private', basicAuth, (req, res) => {
  res.status(200).json(req.userData);
});


router.get('/readonly', basicAuth, accessCL('read'), (req, res) => {
  res.status(200).send('readonly!');
});

router.get('/read', basicAuth, accessCL('read'), (req, res) => {
  res.status(200).send('readed!');
});

router.get('/create', basicAuth, accessCL('create'), (req, res) => {
  res.status(200).send('created!');
});

router.get('/update', basicAuth, accessCL('update'), (req, res) => {
  res.status(200).send('updated!');
});

router.get('/delete', basicAuth, accessCL('delete'), (req, res) => {
  res.status(200).send('deleted!');
});
router.get('/everything', barearOauth, accessCL('read', 'create', 'update', 'delete'), (req, res) => {
  res.status(200).send('get all!');
});



module.exports = router;


//**************************************************************************** */
