const { Router } = require('express');
const Joi = require('joi');
const { status, errorMessages } = require('../helpers');
const { loginService } = require('../services');

const loginRoute = Router();

const validData = (body) => 
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required(),
  }).validate(body);

loginRoute.post('/', async (req, res, next) => {
  const { error } = validData(req.body);
  if (error) return next(errorMessages.ALL_FIELDS_MUST_BE_FIELD);
  const { email, password } = req.body;
  try {
    const validateInfo = await loginService.validUserService(email, password);
    if (validateInfo.isError) return next(validateInfo);
    return res.status(status.SUCCESS).json({ token: validateInfo });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = loginRoute;
