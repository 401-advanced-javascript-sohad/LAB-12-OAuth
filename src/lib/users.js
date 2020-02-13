
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//password encrypt 
const jwt = require('jsonwebtoken');

require('dotenv').config();

// let users = {};

const users = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  role: {type: String, required: true, default:'user', enum:['user', 'admin', 'editor']},
  
});

users.statics.checkAccess = (access, role)=>{
  console.log(access, role);

  let user = ['read'];
  let editor = ['read', 'create', 'update'];
  let admin = ['read', 'create', 'update', 'delete'];

  if(role === 'admin' ){
    for(let i = 0; i < admin.length;i++){
      if(typeof(access =='string')&& access === admin[i]) return true;
      else if((access[i] === admin[i])) return true;
    }
  }
  if(role === 'editor'){
    for(let i = 0; i < editor.length;i++){
      if(access === editor[i] ) return true;
    }
  }
  if(role === 'user'){
    for(let i = 0; i < user.length;i++){
      if(access === user[i]) return true;
    }
  }
  
};




users.pre('save', async function(){
  if (!users.username) {
    
    this.password = await bcrypt.hash(this.password, 5);
  }
});





//////////////////////////////Authentication//////////////////////////////////////

users.statics.basicAuthenticate = function(auth) {
    // console.log('auth in basic ' , auth);
    
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
  let userData = {
    username: user.username,
    capabilities: user.role,
  };
  // console.log(userData);
  let token = jwt.sign(userData, process.env.SECRET);
  return token;

};


users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};





users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = jwt.verify(token, process.env.SECRET);
    // console.log(tokenObject)
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


//************************************************************************** */\\
