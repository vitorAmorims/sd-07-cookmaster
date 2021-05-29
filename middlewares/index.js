const errorMiddleware = require('./error');
const token = require('./token');
const isLogged = require('./authentication');
const multer = require('./multer');

module.exports = { 
  errorMiddleware,
  token,
  isLogged,
  multer,
};
