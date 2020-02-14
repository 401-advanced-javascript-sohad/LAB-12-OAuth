/* eslint-disable strict */
'use strict';

module.exports = (err, req, res) => {
  console.error('server error', err);
  res.statusCode = 500;

  res.statusMessage = 'eroor server';
  res.write( JSON.stringify(err) );
  res.end();
};