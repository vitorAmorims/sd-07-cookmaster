// const loginModel = require('../models/loginModel');
const userModel = require('../models/userModel');
const { errorMessages, validEmailFormat } = require('../helpers');

const getAllUserService = async () => {
 //  const result = await loginModel.getAllUsersModel();
 //  return result;
};

async function validUserService(email, password) {
 if (!email || !password || !validEmailFormat(email)) return errorMessages.ALL_FIELDS_MUST_BE_FIELD;

 const getEmail = await userModel.getUserByEmail(email);

  if (getEmail.length < 1) return errorMessages.INCORRECT_USERNAME_OR_PASSWORD;

  const getPassword = await userModel.getUserByPassword(password);

  if (getPassword.length < 1) return errorMessages.INCORRECT_USERNAME_OR_PASSWORD;

  const result = await userModel.createUserModel(email, password);
  return result;
}

module.exports = {
  validUserService,
  getAllUserService,
};
