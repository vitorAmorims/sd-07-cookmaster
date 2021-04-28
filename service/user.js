const User = require('../models/user.js');
const { code, message } = require('../config/statusTable');

const validateFields = (name, email, password) => {
  const reg = /\S+@\S+\.\S+/;
  const isEmailValid = reg.test(email);

  if (!name || !email || !password || !isEmailValid) {
    return { code: code.bad_request, message: message.bad_request };
  }
  return {};
};

const addUser = async (name, email, password, role) => {
  const validation = validateFields(name, email, password);
  if (validation.message) return validation;

  const result = await User.addUser(name, email, password, role);
  if (!result) {
    return { code: code.conflict, message: message.conflict };
  }
  return { code: code.created, result };
};

module.exports = {
  addUser,
};
