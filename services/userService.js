const model = require('../models');
const validateUser = require('./validateUser');

const createUserService = async (user) => {
  const { name, email, password } = user;
  validateUser.nameValidation(name);
  validateUser.passwordValidation(password);
  validateUser.emailFormatValidation(email);
  await validateUser.emailValidations(email);
  const newUser = await model.usersModel.createUser({ name, email, password });
  return newUser;
};

module.exports = {
  createUserService,
};