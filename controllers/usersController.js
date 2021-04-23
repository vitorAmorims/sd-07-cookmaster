const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const UsersModel = require('../models/usersModel');
// const UserService = require('../service/usersService');

const {
  OK,
  CREATED,
} = require('../httpStatusCodes');

const createUser = rescue(async (req, res) => {
  const data = req.body;

  data.role = 'user';

  const newUser = await UsersModel.insertUser(data);

  return res.status(CREATED).json({ user: newUser.ops[0] });
});

const userLogin = rescue(async (req, res) => {
  const secret = 'anySecretWorks';

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(req.body, secret, jwtConfig);

  return res.status(OK).json({ token });
});

const createAdmin = rescue(async (req, res) => {
  const adminData = req.body;

  adminData.role = 'admin';

  const newAdmin = await UsersModel.insertUser(adminData);

  return res.status(CREATED).json({ user: newAdmin.ops[0] });
});

module.exports = {
  createUser,
  userLogin,
  createAdmin,
};
