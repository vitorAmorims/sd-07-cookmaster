const rescue = require('express-rescue');
const { statusCodes, statusMessages } = require('../utils');
const { usersService } = require('../services');

const createUserController = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await usersService({ name, email, password });
  return res.status(statusCodes.CREATED).send(newUser);
});

const createAdminController = rescue(async (req, res) => {
  const { role } = req.user;
  if (role !== 'admin') {
    throw new Error(statusMessages.FORBIDDEN);
  }
  const { name, email, password } = req.body;
  const newUser = await usersService({ name, email, password, role: 'admin' });
  return res.status(statusCodes.CREATED).send(newUser);
});

module.exports = {
  createUserController,
  createAdminController,
};