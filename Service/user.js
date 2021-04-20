const user = require('../Model/user');
const { validateUserData, message, emailAlreadyRegistered } = require('./userValidations');

const create = async (name, email, password) => {
  const { error } = validateUserData({ name, email, password });
  if (error) throw message.invalidEntries;
  if (await emailAlreadyRegistered(email)) throw message.emailRegistered;
  const role = 'user';
  return user.create(name, email, password, role);
};

module.exports = {
  create,
};