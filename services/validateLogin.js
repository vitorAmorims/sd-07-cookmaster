const statusMessages = require('../utils/statusMessages');

module.exports = {
  emailValidation: (email) => {
    if (!email) {
      console.log({ email });
      throw new Error(statusMessages.FIELDS_REQUIRED);
    }
  },
  passwordValidation: (password) => {
    if (!password) {
      console.log({ password });
      throw new Error(statusMessages.FIELDS_REQUIRED);
    }
  },
  emailFormatValidation: (email) => {
    const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expectedPattern.test(email)) {
      console.log({ email });
      throw new Error(statusMessages.USERNAME_OR_PASSWORD_INCORRECT);
    }
  },
};