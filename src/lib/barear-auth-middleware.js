
/* eslint-disable strict */
'use strict';

const Users = require('./users.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) { next('invalid login'); }

  let token = req.headers.authorization.split(' ').pop();
  console.log(req.headers.authorization);
  console.log(req.headers.authorization.split(' '));
  console.log(token);


  Users.authenticateToken(token)
    .then(validUser => {
      req.user = validUser;
      next();
    }).catch(err => next(err));
};