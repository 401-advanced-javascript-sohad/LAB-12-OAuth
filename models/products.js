'use strict';

const scheama = require('./products-scheama.js');
const Model = require('./model.js');

class Products extends Model{}

module.exports = new Products(scheama);