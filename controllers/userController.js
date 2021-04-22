const Joi = require('joi');
const { Router } = require('express');
const { status, errorMessages } = require('../helpers');
const { userService } = require('../services');

const userRoute = Router();

userRoute.get('/', async (_req, res) => {
  const result = await userService.getAllUserService();
  return res.status(status.SUCCESS).json({ message: 'Get Users Ok', result });
});

const validData = (body) => 
  Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.required(),
  }).validate(body);

userRoute.post('/', async (req, res, next) => {
  const { error } = validData(req.body);
  if (error) return next(errorMessages.INVALID_ENTRIES);
  const { name, email, password } = req.body;
  try {
    const validateInfo = await userService.validUserService(name, email, password);

    if (validateInfo.isError) return next(validateInfo);

    return res.status(status.CREATED).json(validateInfo);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = userRoute;