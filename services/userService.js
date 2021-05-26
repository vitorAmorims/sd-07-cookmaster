const model = require('../models');
const validateUser = require('./validateUser');

module.exports = async (user) => {
  const { name, email, password } = user;
  validateUser.nameValidation(name);
  validateUser.passwordValidation(password);
  validateUser.emailFormatValidation(email);
  await validateUser.emailValidations(email);
  const newUser = await model.usersModel.createUser(user);
  return newUser;
};
