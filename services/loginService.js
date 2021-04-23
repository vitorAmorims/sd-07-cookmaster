const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');
const { emptyOrUdefined } = require('../utils');
const status = require('../status');
const { userModel } = require('../models');

const TIME_TOKEN_EXPIRATION = 60 * 60 * 24;
const secret = 'mysecretjtw';

const generateToken = (userEmail) => {
  const jwtConfig = {
    expiresIn: TIME_TOKEN_EXPIRATION,
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: userEmail }, secret, jwtConfig);
  return token;
};
const emptyEntries = {
  err: 'All fields must be filled',
  err_code: status.INVALID_LOGIN,
};

const invalidEntries = {
  err: 'Incorrect username or password',
  err_code: status.INVALID_LOGIN,
};

const userAndPasswordVerification = async (dataLogin) => {
  const user = await userModel.findByEmail(dataLogin.email);
  if (user === null) return invalidEntries;
  if (user.password !== dataLogin.password) return invalidEntries;

  return generateToken(user.email);
};
const loginValidation = async (dataLogin) => {
  if (emptyOrUdefined(dataLogin.email) || emptyOrUdefined(dataLogin.password)) {
    return emptyEntries;
  }
  if (!emailValidator.validate(dataLogin.email)) {
    return invalidEntries;
  }
  const response = await userAndPasswordVerification(dataLogin);
  console.log('response loginValidation', response);
  return response;
};

module.exports = {
  loginValidation,
};
