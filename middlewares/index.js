const errorMiddleware = require('./errorMiddleware');
const entriesValidate = require('./entriesValidate');
const loginValidate = require('./loginValidate');
const authValidate = require('./authValidate');
const isSigned = require('./isSigned');

module.exports = {
  errorMiddleware,
  entriesValidate,
  isSigned,
  loginValidate,
  authValidate,
};
