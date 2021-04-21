const Joi = require('joi');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');
const rescue = require('express-rescue');
const usersService = require('../service/usersService');

const SUCCESS = 201;
// const OK = 200;

const registerUser = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
    roles: Joi.string(),
  }).validate(req.body);
  // name, password, email, role
  if (error) return next(error);

  const { name, email, password, role } = req.body;

  const newUser = await usersService.registerUser(name, email, password, role);

  if (newUser.message) return next(newUser);
  // console.log(newUser.message);
  res.status(SUCCESS).json(newUser);
});

module.exports = {
  registerUser,
};
