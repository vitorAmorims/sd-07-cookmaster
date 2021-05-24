const model = require('../../model');
const { errorMessages: error } = require('../../utils');

const isEmailValid = (email) => {
  const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  return emailValidate.test(email);
};

module.exports = { 
  name: (name) => {
    if (!name) throw new Error(error.INVALID_ENTRIES);
  },
  email: async (email) => {
    const dbEmail = await model.users.findByEmail(email);
    if (dbEmail) throw new Error(error.EMAIL_REGISTERED);
    if (!isEmailValid(email)) throw new Error(error.INVALID_ENTRIES);
  },
  password: (password) => {
    if (!password) throw new Error(error.INVALID_ENTRIES);
  },
};
