const UserModel = require('../models/userModel');

const addUser = async (name, email, password) => UserModel.addUser(name, email, password);

module.exports = {
  addUser,
};