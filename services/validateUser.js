const statusMessages = require('../utils/statusMessages');
const { usersModel } = require('../models');

const nameValidation = (name) => {
  if (!name) {
    throw new Error(statusMessages.INVALID_ENTRIES);
  }
};

const passwordValidation = (password) => {
  if (!password) {
    throw new Error(statusMessages.INVALID_ENTRIES);
  }
};

const emailFormatValidation = (email) => {
  const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!expectedPattern.test(email)) {
    throw new Error(statusMessages.INVALID_ENTRIES);
  }
};

const emailValidations = async (email) => {
  const userByEmail = await usersModel.getUserByEmail(email);
  if (userByEmail) {
    throw new Error(statusMessages.EMAIL_REGISTERED);
  }
};

module.exports = {
  nameValidation,
  passwordValidation,
  emailFormatValidation,
  emailValidations,
};