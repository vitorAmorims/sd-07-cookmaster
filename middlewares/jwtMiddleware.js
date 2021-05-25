const rescue = require('express-rescue');
const statusMessages = require('../utils/statusMessages');
const model = require('../models');
const authFile = require('../services/auth');

module.exports = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new Error(statusMessages.MISSING_AUTH);

  const { data } = authFile.decode(token);

  const user = await model.usersModel.getUserByEmail(data.email);

  if (!user) throw new Error(statusMessages.INVALID_TOKEN);

  req.user = user; // vai mandar dados do usuário nessa chave user

  next();
});