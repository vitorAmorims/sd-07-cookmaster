const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');

const UsersModel = require('../models/usersModel');
// const UserService = require('../service/usersService');

const {
  CREATED,
} = require('../httpStatusCodes');

const createUser = rescue(async (req, res) => {
  const data = req.body;

  data.role = 'user';

  const newUser = await UsersModel.insertUser(data);

  return res.status(CREATED).json({ user: newUser.ops[0] });
});

module.exports = {
  createUser,
};
