const statusMessages = require('../utils/statusMessages');
// const { usersModel } = require('../models');

const emailValidation = (email) => {
  if (!email) {
    throw new Error(statusMessages.FIELDS_REQUIRED);
  }
};

const emailFormatValidation = (email) => {
  const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!expectedPattern.test(email)) {
    throw new Error(statusMessages.USERNAME_OR_PASSWORD_INCORRECT);
  }
};

const passwordValidation = (password) => {
  if (!password) {
    throw new Error(statusMessages.USERNAME_OR_PASSWORD_INCORRECT);
  }
};

module.exports = {
  emailValidation,
  emailFormatValidation,
  passwordValidation,
};