const { usersModel } = require('../models');
const { userToken } = require('../helpers/authentication');

const {
  validEntries,
  registeredEmail,
  isEmailPassword,
  validLogin,
} = require('../validations/usersValidation');

const add = async (name, email, password) => {
  await validEntries(name, email, password);
  await registeredEmail(email);
  // await existEmail(email);

  const user = await usersModel.add(name, email, password);
  delete user.password; // código @rafaelmguimaraes
  return user;
};

const login = async (email, password) => {
  isEmailPassword(email, password);
  const user = await validLogin(email, password);

  const tokenLogin = await userToken(user);
  return tokenLogin;
};

module.exports = {
  add,
  login,
};
