const UserModel = require('../models/userModel');

const addUser = async (name, email, password) => {
  if (!name || !email || !password) {
    return { code: 422, message: 'Invalid entries. Try again' };
  }

  const userResponse = UserModel.addUser(name, email, password);
  return { code: 200, userResponse };
};

module.exports = {
  addUser,
};