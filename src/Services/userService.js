const { createUser } = require('../Models/Users/createUser');
const { getUserByEmail } = require('../Models/Users/getUserByEmail');
const { loginUser } = require('../Models/Users/loginUser');

const createUserService = async (name, email, password, role = 'user') =>
  createUser(name, email, password, role);

const getUserByEmailService = async (email) => getUserByEmail(email);

const loginService = async (email, password) => loginUser(email, password);

module.exports = {
  createUserService,
  getUserByEmailService,
  loginService,
};
