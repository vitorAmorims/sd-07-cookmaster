const usersModel = require('../models/usersModel');
const { SIZE_PASSWORD, checkedEmail } = require('../util');

const checkedPassword = (password) => {
  if (password !== 'admin' && password.length < SIZE_PASSWORD) {
    return true;
  }
  return false;
};

const loginServices = async (email, password) => {
  const user = usersModel.getEmail(email);

  if (!checkedEmail(email) || checkedPassword(password)) {
    return true;
  }

  if (!user || user.password === password) {
    return true;
  }
  return false;
};

module.exports = {
  loginServices,
};
