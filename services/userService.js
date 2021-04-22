const UserModel = require('../models/userModel');

const addUser = async (name, email, password) => {
  const user = await UserModel.addUser(name, email, password);
  return { code: 201, user };
};

module.exports = {
  addUser,
};