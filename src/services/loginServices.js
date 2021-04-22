const usersModel = require('../models/usersModel');
const { SIZE_PASSWORD, checkedEmail } = require('../util');

const loginServices = async (email, password) => {
  const user = usersModel.getEmail(email);

  if (!checkedEmail(email) || password.length < SIZE_PASSWORD) {
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
