const { ApiStatusCode, Errors } = require('../enums');
const { validationSchema } = require('../schemas');
const { recipeModel } = require('../models');

const validation = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  const { BAD_REQUEST } = ApiStatusCode;
  const { INVALID_ENTRIES } = Errors;

  if (!name) return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });

  if (!email) return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  
  if (!validationSchema.isEmailValid(email)) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  if (!password) return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  
  next();
};

const userExists = async (req, res, next) => {
  const { email, password } = req.body;
  const { CONFLICT } = ApiStatusCode;
  const { EMAIL_REGISTERED } = Errors;

  const emailFound = await validationSchema.isEmailExists(email);

  if (emailFound) return res.status(CONFLICT).json({ message: EMAIL_REGISTERED });

  req.body.password = password;
  next();
};

const validateRecipe = async (req, res, next) => {
  const { ingredients, preparation, name } = req.body;
  const { BAD_REQUEST } = ApiStatusCode;
  const { INVALID_ENTRIES } = Errors;
 
  if (!name) return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  if (!ingredients) return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  if (!preparation) return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });

  next();
};

const isRecipeExists = async (req, res, next) => {
  const { id } = req.params;
  const min = 24;
  const { NOT_FOUND } = ApiStatusCode;
  const { RECIPE_NOT_FOUND } = Errors;

  if (id.length < min) return res.status(NOT_FOUND).json({ message: RECIPE_NOT_FOUND });

  const recipeRes = await recipeModel.getRecipeById(id);

  if (!recipeRes) return res.status(NOT_FOUND).json({ message: RECIPE_NOT_FOUND });

  next();
};

module.exports = {
  validation,
  userExists,
  validateRecipe,
  isRecipeExists,
};