'use strict';

const users = require('./users.js');


module.exports = (access) => {
  
  return (req, res, next) => {
    console.log(access, req.user.role);
    
    try {

      if (users.checkAccess(access, req.user.role)) {
        next();
      }
      else {
        next('cannot Access');
      }
    } catch (e) {
      next('Invalid Login');
    }

  };

};