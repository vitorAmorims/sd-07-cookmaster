const UserService = require('../services/userService');
const UserModel = require('../models/userModel');

const getAll = async (req, resp) => {
  try {
    const users = await UserModel.getAll();

    resp.status(200).json(users);
  } catch (error) {
    console.error(error.message);
  resp.status(500).json({ message: error.message });
  }
};

const addUser = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    const { code, user } = await UserService.addUser(name, email, password);
    return resp.status(code).json({ user });
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  addUser,
};