const userModel = require('../models/userModel');
const { errorMessages, validEmailFormat } = require('../helpers');

const getAllUserService = async () => {
  const result = await userModel.getAllUsersModel();
  return result;
};

const isValid = (name, email, password) => {
  if (!name || !email || !password || !validEmailFormat(email)) {
    // return errorMessages.INVALID_ENTRIES;
    return false;
  }
  return true;
};

const validUserService = async (name, email, password, role = 'user') => {
  if (!isValid(name, email, password)) return errorMessages.INVALID_ENTRIES;
  
  const getEmail = await userModel.getUserByEmail(email);
  console.log(getEmail);
  if (getEmail) return errorMessages.EMAIL_ALREADY_REGISTERED;

  const result = await userModel.createUserModel(name, email, password, role);
  return result;
};

module.exports = {
  validUserService,
  getAllUserService,
};
