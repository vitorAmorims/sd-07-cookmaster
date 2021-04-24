const Users = require('../models/usersModels');
const { generateAuthToken } = require('../services/authTokenService');

const SUCCESS = 201;
const SUCCESS200 = 200;
const SYSTEM_FAIL = 500;
// const FAIL = 404;
const UNAUTHORIZED = 401;

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const results = await Users.addUser(name, email, password, role);
    res.status(SUCCESS).json({ user: results.ops[0] });
  } catch (err) {
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const id = await Users.checkForUserEmail.id;
  try {
    const token = generateAuthToken(id, email, role, password);
    res.status(SUCCESS200).json({ token });
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

module.exports = {
  addUser,
  login,
};