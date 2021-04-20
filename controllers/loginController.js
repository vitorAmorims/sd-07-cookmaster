const { Router } = require('express');
const { status } = require('../helpers');
const { loginService } = require('../services');

const loginRoute = Router();

loginRoute.post('/', async (req, res, next) => {
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
