const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');
const { codes, messages } = require('../httpResponses.json');
const HttpException = require('./HttpException');

const isPasswordValid = (password) => {
  if (password === undefined || password === '') {
    throw new HttpException(messages.loginFieldBlank, codes.UNAUTHORIZED);
  }
};

const isEmailValid = (email) => {
  if (email === undefined || email === '') {
    throw new HttpException(messages.loginFieldBlank, codes.UNAUTHORIZED);
  }
};

const isLoginCorrect = async ({ email, password }) => {
  const user = await usersModels.findByEmail(email);

  if (user === null || user.password !== password) {
    throw new HttpException(messages.incorrectLogin, codes.UNAUTHORIZED);
  }

  return user;
};

const validateLogin = async (login) => {
  isEmailValid(login.email);
  isPasswordValid(login.password);
  const { email, _id, role } = await isLoginCorrect(login);
  const token = jwt.sign({ data: { email, role, id: _id } }, 'secret');

  return { token, status: codes.OK };
};

module.exports = {
  validateLogin,
};