//  const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
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
    const { name, email } = req.body;
    let { password } = req.body;

    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(password, salt);
    
    const { code, user } = await UserModel.addUser(name, email, password);
    return resp.status(code).json({ user });
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, resp) => {
  try {
    const { email } = req.body;
    let { password } = req.body;

    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(password, salt);

    const newLogin = await UserModel.loginUser(email, password);

    if (!newLogin) throw new Error();

    return resp.status(201).json({ newLogin });
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