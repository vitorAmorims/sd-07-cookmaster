const errorMiddleware = require('./errorMiddleware');
const loginMiddleware = require('./loginMiddleware');
const tokenMiddleware = require('./tokenMiddleware');

module.exports = { 
  errorMiddleware,
  loginMiddleware,
  tokenMiddleware,
};
