const jwt = require('jsonwebtoken');
const { message, emailAndLoginFilled, validEmailAndPassword } = require('./loginValidation');
const secret = require('../config/secret');

const login = async (email, password) => {
  const { error } = emailAndLoginFilled({ email, password });
  if (error) throw message.emptyField;
  if (!await validEmailAndPassword(email, password)) throw message.invalidEmailOrPassword;
  
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email, password }, secret, jwtConfig);

  return token;
};

module.exports = {
  login,
};