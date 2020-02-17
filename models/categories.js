'use strict';

const scheama = require('./categories-schema.js');
const Model = require('./model.js');

class Categories extends Model{}

module.exports = new Categories(scheama);