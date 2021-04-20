// const loginModel = require('../models/loginModel');
const jwt = require('jsonwebtoken');

//  const result = await loginModel.getAllUsersModel();
//  return result;

const secret = 'xablau';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyToken,
};
