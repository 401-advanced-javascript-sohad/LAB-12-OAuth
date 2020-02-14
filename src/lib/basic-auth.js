'use strict';

// const base64 = require('base-64');
const Users = require('./users.js');

module.exports = (req, res, next) => {

  let [authType, encodedString] = req.headers.authorization.split(/\s+/);

  switch(authType.toLowerCase()) {
  case 'basic':
    return basicAuth(encodedString);
  default:
    break;
  }

  ////////////////////////////////////////////////////////////////////

  function basicAuth(authString) {
    let base64Buffer = Buffer.from(authString,'base64');
    console.log('base64Buffer',base64Buffer);
    
    let bufferStr = base64Buffer.toString();
    console.log('bufferStr',bufferStr);
    
    let [username,password] = bufferStr.split(':');
    let auth = {username,password};
    console.log('auth',auth);
    
    // let user = new Users();
    // console.log('user before auth ',user);
    
    Users.basicAuthenticate(auth)
      .then( user =>{
        console.log('user',user);
        console.log(user);
        req.user = user;
        req.token = user.generateToken(user);
        next();
      });
  }
};