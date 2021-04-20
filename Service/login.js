const jwt = require('jsonwebtoken');
const user = require('../Model/user');
const { message, emailAndLoginFilled } = require('./loginValidation');
const secret = require('../config/secret');

const login = async (email, password) => {
  const { error } = emailAndLoginFilled({ email, password });
  if (error) throw message.emptyField;

  const data = await user.getByEmail(email);
  if (data === null) throw message.invalidEmailOrPassword;
  if (data.password !== password) throw message.invalidEmailOrPassword;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const { _id } = data;
  const token = jwt.sign({ email, password, _id }, secret, jwtConfig);

  return token;
};

module.exports = {
  login,
};