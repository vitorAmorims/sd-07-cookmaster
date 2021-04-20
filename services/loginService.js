// const loginModel = require('../models/loginModel');

const userModel = require('../models/userModel');
const { errorMessages, validEmailFormat, authTools } = require('../helpers');

/* const getAllUserService = async () => {
  //  const result = await loginModel.getAllUsersModel();
  //  return result;
}; */

async function validUserService(email, password) {
  if (!email || !password || !validEmailFormat(email)) return errorMessages.ALL_FIELDS_MUST_BE_FIELD;

  const user = await userModel.getUserByEmail(email);

  if (!user || user.password !== password) return errorMessages.INCORRECT_USERNAME_OR_PASSWORD;

  const token = authTools.generateToken({ data: user })

  return token;
}

module.exports = {
  validUserService,
};
