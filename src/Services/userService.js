const { createUser } = require('../Models/Users/createUser');
const { getUserByEmail } = require('../Models/Users/getUserByEmail');

const createUserService = async (name, email, password) => createUser(name, email, password);

const getUserByEmailService = async (email) => getUserByEmail(email);

module.exports = {
  createUserService,
  getUserByEmailService,
};
