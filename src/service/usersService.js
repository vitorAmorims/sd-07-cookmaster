const { usersModel } = require('../models');

const { mailValidate, nameValidate } = require('../validations');

const creatUser = async (user) => {
  const { name, email } = user;
  nameValidate(name);
  mailValidate(email);
  const haveRole = Object.keys(user).find((element) => element === 'role');
  const newUser = user;
  if (!haveRole) newUser.role = 'user';
  const createdUser = await usersModel.createUser(user);
  return createdUser;
};

module.exports = {
  creatUser,
};
