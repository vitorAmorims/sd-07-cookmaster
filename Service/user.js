const user = require('../Model/user');
const { validateUserData, message, emailAlreadyRegistered } = require('./userValidations');

const errorMessageNotAdmin = { message: 'Only admins can register new admins' };
const create = async (name, email, password) => {
  const { error } = validateUserData({ name, email, password });
  if (error) throw message.invalidEntries;
  if (await emailAlreadyRegistered(email)) throw message.emailRegistered;
  const role = 'user';
  return user.create(name, email, password, role);
};

const createAdmin = async (name, email, password, admin) => {
  console.log(admin);
  if (admin !== 'admin') throw errorMessageNotAdmin;
  const role = 'admin';
  const response = await user.createAdmin(name, email, password, role);
  console.log(response);
  return response;
};

module.exports = {
  create,
  createAdmin,
};