'use strict';

const mongoose = require('mongoose');
require('./products-scheama.js');


///////////////////////////////////////////////////////  
const cSchema = mongoose.Schema({
  name: {type:String, required: true},
  description: {type:String},
},{toOBject:{virtuals: true}, toJSON: {virtuals: true}});

cSchema.virtual('actualProducts',{
  ref: 'products',
  localField: 'name',
  foreignField: 'categoryName',
  justOne: false,
});

cSchema.pre('findOne', function (){
  try{
    this.populate('actualProducts');
  }catch(e){
    console.error(e);
  }
});
module.exports = mongoose.model('categories',cSchema);
