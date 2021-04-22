const { createUser } = require('../Models/Users/createUser');
const { getUserByEmail } = require('../Models/Users/getUserByEmail');

const createUserService = async (name, email, password, role = 'user') =>
  createUser(name, email, password, role);

const getUserByEmailService = async (email) => getUserByEmail(email);

module.exports = {
  createUserService,
  getUserByEmailService,
};
