const CODE_TOKEN_ERROR = 401;
const NOT_FOUND = 404;
const INVALID_TOKEN = 'jwt malformed';
const REGEX_TOKEN = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
const { getRecipeById } = require('../../Models/Recipes/getRecipeById');

const validationToken = (token) => {
  if (!REGEX_TOKEN.test(token)) {
    return true;
  }
};

const getRecipeByIdMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const recipeExist = await getRecipeById(id);
  if (!recipeExist) {
    res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  
  if (authorization && validationToken(authorization)) {
    res.status(CODE_TOKEN_ERROR).json({ message: INVALID_TOKEN });
  }

  next();
};

module.exports = {
  getRecipeByIdMiddleware,
};
