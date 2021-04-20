const { Router } = require('express');
const { status, errorMessages } = require('../helpers');

const { loginService } = require('../services');

const recipeRoute = Router();

recipeRoute.get('/', (req, res) => res.status(status.SUCCESS).json({ message: 'rota recipes ok' }));

recipeRoute.post('/', async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {

    if (!name || !ingredients || !preparation) return next(errorMessages.INVALID_ENTRIES);

    const validateInfo = await loginService.validUserService(email, password);
    if (validateInfo.isError) return next(validateInfo);
    return res.status(status.SUCCESS).json({ token: validateInfo });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = recipeRoute;
