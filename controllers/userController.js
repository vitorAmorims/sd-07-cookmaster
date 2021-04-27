const UserModel = require('../models/userModel');
const { generateAuthToken } = require('../services/authService');

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
    const { code, user } = await UserModel.addUser(name, email, password);
    return resp.status(code).json({ user });
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, resp) => {
  try {
    const { _id, email, role } = await UserModel.replyEmail(req.body.email);
    const token = generateAuthToken(_id, email, role);
    resp.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  addUser,
  loginUser,
};