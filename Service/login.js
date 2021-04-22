const jwt = require('jsonwebtoken');
const user = require('../Model/user');
const { message } = require('./errorMessages');
const { emailAndLoginFilled } = require('./loginValidation');
const { secret, jwtConfig } = require('../config/jwtConfig');

const login = async (email, password) => {
  const { error } = emailAndLoginFilled({ email, password });
  if (error) throw message.emptyField;

  const data = await user.getByEmail(email);
  if (data === null || data.password !== password) throw message.invalidEmailOrPassword;

  const { _id, role } = data;
  const token = jwt.sign({ email, password, _id, role }, secret, jwtConfig);

  return token;
};

module.exports = {
  login,
};