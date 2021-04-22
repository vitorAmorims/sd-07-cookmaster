const usersModel = require('../Models/usersModel');

const createUser = async (name, email, password) => {
  const role = 'user';
  return usersModel.createUser(name, email, password, role); 
};

const searchEmail = async (email) => usersModel.searchEmail(email);

module.exports = {
  createUser,
  searchEmail,
};
