const userDataValidation = require('./userDataValidation');
const checkDuplicate = require('./checkDuplicate');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  userDataValidation,
  checkDuplicate,
  errorMiddleware,
};