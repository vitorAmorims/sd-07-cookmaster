const LoginsModel = require('../models/loginsModel');
const UsersModel = require('../models/usersModel');
const error = require('../errors');

const registerTokenUser = async (email, password) => {
  const user = await UsersModel.findUserByEmail(email);
  if (!user || user.password !== password) throw error.loginFailure;
  return LoginsModel.newToken(user);
};

module.exports = {
  registerTokenUser,
};
