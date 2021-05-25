const rescue = require('express-rescue');
const { statusCodes } = require('../utils');
const { usersService } = require('../services');

module.exports = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await usersService({ name, email, password });
  return res.status(statusCodes.CREATED).send(newUser);
});
