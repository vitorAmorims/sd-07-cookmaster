const userModel = require('../models/userModel');
const { errorMessages, validEmailFormat } = require('../helpers');

const getAllUserService = async () => {
  const result = await userModel.getAllUsersModel();
  return result;
};

async function validUserService (name, email, password, role = 'user') {
  if (!name || !email || !password || !validEmailFormat(email)) return errorMessages.INVALID_ENTRIES;

  const getEmail = await userModel.getUserByEmail(email);
  console.log(getEmail)
  if (getEmail) return errorMessages.EMAIL_ALREADY_REGISTERED;

  const result = await userModel.createUserModel(name, email, password, role);
  return result;
};

module.exports = {
  validUserService,
  getAllUserService,
};
