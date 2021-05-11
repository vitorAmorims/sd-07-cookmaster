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

const authLogin = async (user) => {
  const userCreated = await usersModel.findUserByEmail(user.email);
  if (!userCreated || !userCreated.password === user.password) {
    throw new Error('Incorrect username or password');
  }
};

module.exports = {
  creatUser,
  authLogin,
};
