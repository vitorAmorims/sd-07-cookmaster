const modelUser = require('../models/users');

let ERR_MESSAGE = 'All fields must be filled';

const validateEmail = (email) => {
  if (!email) {
    throw new Error(ERR_MESSAGE);
  }
  if (email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      throw new Error(ERR_MESSAGE);
    }
  }
};

const validatePassword = (password) => {
  if (!password) {
    ERR_MESSAGE = 'All fields must be filled';
    throw new Error(ERR_MESSAGE);
  }
};

const checkingEmailExists = async (email) => {
  const account = await modelUser.getByEmail(email);
  if (!account) {
    ERR_MESSAGE = 'Incorrect username or password';
    throw new Error(ERR_MESSAGE);
  }
  // if (account.password !== password) {
  //   ERR_MESSAGE = 'Incorrect username or password';
  //   throw new Error(ERR_MESSAGE);
  // }
};

const validations = async (email, password) => {
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  const result = await modelUser.getByEmail(email);
  return result;
};

module.exports = {
  validations,
};