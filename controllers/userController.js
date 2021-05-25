const rescue = require('express-rescue');
const statusCodes = require('../utils/statusCodes');
const userService = require('../services/userService');
// const statusMessages = require('../utils/statusMessages');
// const model = require('../models');

const createUserController = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.createUserService({ name, email, password });
  return res.status(statusCodes.CREATED).send(newUser);
});

module.exports = {
  createUserController,
};