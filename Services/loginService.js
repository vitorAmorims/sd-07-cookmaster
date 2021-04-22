const loginModel = require('../Models/loginModel');

const loginUser = async (email) => loginModel.loginUser(email);

const searchEmailAndPass = async (email, password) =>
  loginModel.searchEmailAndPass(email, password);

module.exports = {
  loginUser,
  searchEmailAndPass,
};
