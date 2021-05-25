const rescue = require('express-rescue');
const model = require('../models');
const { auth, loginService } = require('../services');
const { statusMessages, statusCodes } = require('../utils');

module.exports = rescue(async (req, res) => {
  const { email, password } = req.body;
  loginService(email, password);
  const user = await model.usersModel.getUserByEmail(email).catch((err) => console.error(err));
  if (!user || user.password !== password) {
    throw new Error(statusMessages.USERNAME_OR_PASSWORD_INCORRECT);
  }
  const { _id: id, role } = user;
  const token = auth.generateToken({ id, email, role });
  res.status(statusCodes.SUCCESS).send({ token });
});
