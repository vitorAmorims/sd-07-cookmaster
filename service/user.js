const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { code, message } = require('../config/statusTable');

const validateFields = (name, email, password) => {
  const reg = /\S+@\S+\.\S+/;
  const isEmailValid = reg.test(email);

  if (!name || !email || !password || !isEmailValid) {
    return { code: code.bad_request, message: message.bad_request };
  }
  return {};
};

const addUser = async (name, email, password, role) => {
  const validation = validateFields(name, email, password);
  if (validation.message) return validation;
  const result = await User.addUser(name, email, password, role);
  if (!result) {
    return { code: code.conflict, message: message.conflict };
  }
  return { code: code.created, result };
};

const login = async (email, password) => {
  const secret = 'seusecretdetoken';
  if (!email || !password) return { code: code.unauthorized, message: message.unauthorized };

  const user = await User.login(email, password);

  if (user.password !== password || user.email !== email) {
    return { code: code.unauthorized, message: message.incorrect_fields };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return { code: code.ok, token };
};

const addAdmin = async (name, email, password, role) => {
  const validation = validateFields(name, email, password);
  if (validation.message) return validation;
  const result = await User.addAdmin(name, email, password, role);
  if (!result) {
    return { code: code.forbidden, message: message.forbidden };
  }
  return { code: code.created, result };
};

module.exports = {
  addUser,
  login,
  addAdmin,
};
