const { errorMessages: error } = require('../../utils');
const isEmailValid = require('./isEmailValid');

module.exports = { 
  email: (email) => {
    if (!email) throw new Error(error.FIELDS_FILLED);
    if (!isEmailValid(email)) throw new Error(error.USERNAME_OR_PASSWORD);
  },
  password: (password) => {
    if (!password) throw new Error(error.FIELDS_FILLED);
  },
};
