const bcrypt = require('bcrypt-nodejs');
const User = require('../models/userModel');
const userService = require('../services/userService');

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const UNAUTHORIZED = 401;

const getAllUsers = async (req, res) => {
try {
const results = await User.getAllUsers();

res.status(200).json(results);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

const addUser = async (req, res) => {
try {
const { name, email, password } = req.body;
const result = await userService.verifyUserInput(name, email, password);
if (result) throw new Error(result);

const salt = bcrypt.genSaltSync(5);
const encryptedPassword = bcrypt.hashSync(password, salt);

const newUser = await User.registerUser(name, email, encryptedPassword);
res.status(CREATED).json({ user: newUser });
} catch (err) {
// following solution by @carolbezerra_dev
if (err.message === 'Invalid entries. Try again.') {
return res.status(BAD_REQUEST).json({ message: err.message });
}

res.status(CONFLICT).json({ message: err.message });
}
};

const login = async (req, res) => {
  try {
  const { email, password } = req.body;
  const fieldsCheck = await userService.loginFieldsCheck(email, password);
  if (fieldsCheck === 'All fields must be filled'
  || fieldsCheck === 'Incorrect username or password') {
  throw new Error(fieldsCheck);
  }

  return res.status(SUCCESS).json({ token: fieldsCheck });
  } catch (e) {
  return res.status(UNAUTHORIZED).json({ message: e.message });
  }
};

module.exports = {
addUser,
getAllUsers,
login,
};
