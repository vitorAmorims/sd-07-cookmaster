const usersModel = require('../models/usersModel');
const { SIZE_PASSWORD, checkedEmail } = require('../util');

const checkedPassword = (password) => {
  if (password !== 'admin' && password.length < SIZE_PASSWORD) {
    return true;
  }
  return false;
};

const loginServices = async (email, password) => {
  if (!checkedEmail(email) || checkedPassword(password)) {
    return null;
  }

  const user = await usersModel.getEmail(email);

  if (!user || user.password !== password) {
    return null;
  }
  return user;
};

module.exports = {
  loginServices,
};
