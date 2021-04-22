const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UNAUTHORIZED, OK } = require('../controllers/statusCode');
const usersModel = require('../models/usersModels');

const customAnswer = (message, http = UNAUTHORIZED) => ({
  http,
  message,
});

const secret = 'trybevocemeprometeu';

const userPasswordMessage = {
  message: 'Incorrect username or password',
};

const loginUser = async (email, password) => {
  const user = await usersModel.existsEmail(email);

  if (!user) {
    return customAnswer(userPasswordMessage);
  }
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return customAnswer(userPasswordMessage);
  }
  const jwtConfig = {
    expiresIn: 60 * 10,
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user.email }, secret, jwtConfig);

  return customAnswer(token, OK);
};

module.exports = {
  loginUser,
};