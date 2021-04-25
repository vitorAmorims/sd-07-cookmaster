const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const regex = /\b[\w-]+@[\w-]+\.\w{2,4}\b/gi;

const secret = '12345678';

const { userModel } = require('../models');

const isEmailValid = (email) => email.match(regex);

const isEmailExists = async (email) => {
  const emailRes = await userModel.isEmailExists(email);

  if (emailRes) return true;
  return false;
};

const encryptPassword = (pass) => {
  if (pass) {
    let password = '';
    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(pass, salt);
    return password;
  } return null;
};

const generateToken = (user) => {
  const { _id } = user;
  const jwtConfig = {
    expiresIn: 60 * 100,
    algorithm: 'HS256',
  };

  const payload = {
    _id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return { token };
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return error.message;
  }
};

const getUser = async (email) => {
  const emailRes = await userModel.isEmailExists(email);
  return emailRes;
};

module.exports = {
  isEmailValid,
  isEmailExists,
  encryptPassword,
  generateToken,
  getUser,
  validateToken,
};