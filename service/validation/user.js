const model = require('../../model');
const { errorMessages: error } = require('../../utils');
const isEmailValid = require('./isEmailValid');

module.exports = { 
  name: (name) => {
    if (!name) throw new Error(error.INVALID_ENTRIES);
  },
  email: (email) => {
    if (!isEmailValid(email)) throw new Error(error.INVALID_ENTRIES);
  },
  emailExists: async (email) => {
    const dbEmail = await model.users.findByEmail(email);
    if (dbEmail) throw new Error(error.EMAIL_REGISTERED);
  },
  password: (password) => {
    if (!password) throw new Error(error.INVALID_ENTRIES);
  },
};
