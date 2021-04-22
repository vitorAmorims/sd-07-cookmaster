const loginModel = require('../Models/loginModel');

const loginUser = async (email, password) => {
  return await loginModel.loginUser(email, password);
}

const searchEmailAndPass = async (email, password) => {
  return await loginModel.searchEmailAndPass(email, password);
}

module.exports = {
  loginUser,
  searchEmailAndPass
}