const usersModel = require('../Models/usersModel');

const createUser = async (name, email, password) => {
  const role = 'user';
  return await usersModel.createUser(name, email, password, role); 
};

const searchEmail = async (email) => {
  return await usersModel.searchEmail(email);
}

module.exports = {
  createUser,
  searchEmail
}
