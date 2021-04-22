const user = require('../Model/user');
const { message } = require('./errorMessages');
const { validateUserData, emailAlreadyRegistered } = require('./userValidations');

const create = async (name, email, password) => {
  const { error } = validateUserData({ name, email, password });
  if (error) throw message.invalidEntries;
  if (await emailAlreadyRegistered(email)) throw message.emailRegistered;
  const defaultRole = 'user';
  return user.create(name, email, password, defaultRole);
};

const createAdmin = async (name, email, password, admin) => {
  if (admin !== 'admin') throw message.notAdmin;
  const role = 'admin';
  const response = await user.create(name, email, password, role);
  return response;
};

module.exports = {
  create,
  createAdmin,
};