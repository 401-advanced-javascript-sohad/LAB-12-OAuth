/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//password encrypt 
const jwt = require('jsonwebtoken');

require('dotenv').config();

// let users = {};

const users = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
});


users.pre('save', async function(){
  if (!users.username) {

    this.password = await bcrypt.hash(this.password, 5);
  }
});



//////////////////////////////Authentication//////////////////////////////////////

users.statics.basicAuthenticate = function(auth) {
  console.log('auth in basic ' , auth);
    
  return this.findOne({username:auth.username})
    .then(user => user.trueCompare(auth.password))
    .catch(console.error);
};


//////////////////////////////Compare//////////////////////////////////////


users.methods.trueCompare = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};


//////////////////////////////signin & signup///////////////////////////////////////////

users.methods.generateToken = function(user) {
  let token = jwt.sign({ username: user.username}, process.env.SECRET);
  return token;
};


users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};
users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = jwt.verify(token, process.env.SECRET);
    console.log(tokenObject);
    if (tokenObject.username) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
};
module.exports = mongoose.model('users',users);


