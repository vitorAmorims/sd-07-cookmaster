const jwt = require('jsonwebtoken');
// const { getRecipeById } = require('../controllers/recipesControllers');
const {
  postNewRecipe,
  getRecipeByName,
  getRecipeById,
} = require('../models/recipesModels');

const secret = 'projetoMuitoDificilMeuDeus';

const errorInvalidParameters = {
  http: 400,
  message: { message: 'Invalid entries. Try again.' },
};

const errorJWTInvalid = {
  http: 401,
  message: { message: 'jwt malformed' },
};

const errorNotFound = {
  http: 404,
  message: { message: 'recipe not found' },
};

const validatedParameters = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return errorInvalidParameters;
  return false;
};

const handleNewRecipe = async (name, ingredients, preparation, token) => {
  if (!token) return errorJWTInvalid;

  const parametersIsNotValid = validatedParameters(name, ingredients, preparation);
  if (parametersIsNotValid) return parametersIsNotValid;
  try {
    const { id } = jwt.verify(token, secret);
    console
    await postNewRecipe(name, ingredients, preparation, id);
    const newRecipe = await getRecipeByName(name);
    return {
      http: 201,
      message: { recipe: newRecipe },
    };
  } catch (error) {
    console.error(error)
    return errorJWTInvalid;
  }
};

const handleRecipeById = async (id) => {
  const recipe = await getRecipeById(id);
  if (!recipe) return errorNotFound;
  return {
    http: 200,
    message: recipe,
  };
};

module.exports = {
  handleNewRecipe,
  handleRecipeById,
};
