const rescue = require('express-rescue');
const { usersModel } = require('../models');
const statusMessages = require('../utils/statusMessages');

const userInfoMiddleware = rescue(async (req, _res, next) => {
  const { name, email, password } = req.body;
  const allUsers = await usersModel.getAllUsers();
  const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !expectedPattern.test(email) || !name || !password) {
    throw new Error(statusMessages.INVALID_ENTRIES)
  }
  if (allUsers.find((user) => user.email === email)) {
    throw new Error(statusMessages.EMAIL_REGISTERED)
  }
  next();
});

module.exports = userInfoMiddleware;