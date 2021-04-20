const { Router } = require('express');
const { status } = require('../helpers');
const { userService } = require('../services');

const userRoute = Router();

userRoute.get('/', async (_req, res) => {
  const result = await userService.getAllUserService();
  return res.status(status.SUCCESS).json({ message: 'Get Users Ok', result });
});

userRoute.post('/', async (req, res, next) => {
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