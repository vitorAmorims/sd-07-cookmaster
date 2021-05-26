const rescue = require('express-rescue');
const statusMessages = require('../utils/statusMessages');
const model = require('../models');
const { auth } = require('../services');

module.exports = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new Error(statusMessages.MISSING_AUTH);

  const { data } = auth.decode(token);

  const user = await model.usersModel.getUserByEmail(data.email);

  if (!user) throw new Error(statusMessages.INVALID_TOKEN);

  req.user = user;

  next();
});