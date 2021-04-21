const usersModels = require('../models/usersModels');
const { messages, codes } = require('../httpResponses.json');
const HttpException = require('./HttpException');

const emailAlreadyExists = async (email) => {
  const user = await usersModels.findByEmail(email);
  if (user === null) return false;
  return true;
};

const emailRegexTest = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValidEmail = emailRegex.test(email);

  return isValidEmail;
};

const validateEmail = async (email) => {
  const isEmailValid = emailRegexTest(email);
  if (!isEmailValid) {
    throw new HttpException(messages.invalidEntries, codes.BAD_REQUEST);
  } else {
    const emailExists = await emailAlreadyExists(email);
    if (emailExists) {
      throw new HttpException(messages.emailAlreadyExists, codes.CONFLICT);
    }
  }
};

const validateName = (name) => {
  if (name === undefined || name === null || name === '') {
    throw new HttpException(
      messages.invalidEntries,
      codes.BAD_REQUEST,
      );
    }
};

const validatePassword = (password) => {
  if (password === undefined || password === null || password === '') {
    throw new HttpException(
      messages.invalidEntries,
      codes.BAD_REQUEST,
      );
    }
};

const validateUser = async ({ name, email, password }) => {
  await validateEmail(email);
  validateName(name);
  validatePassword(password);
};

module.exports = validateUser;