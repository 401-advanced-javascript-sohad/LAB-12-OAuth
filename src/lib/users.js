/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//password encrypt 
const jwt = require('jsonwebtoken');

require('dotenv').config();

// let users = {};

const users = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});


users.pre('save', async function(){
  if (!users.username) {

    this.password = await bcrypt.hash(this.password, 5);
  }
});



//////////////////////////////Authentication//////////////////////////////////////

users.statics.basicAuthenticate = function(auth) {
    
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

module.exports = mongoose.model('users',users);


