const jwt = require('jsonwebtoken');
const {
  postNewRecipe,
  getRecipeByName,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addImage,
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

const errorJWTMissing = {
  http: 401,
  message: { message: 'missing auth token' },
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
    await postNewRecipe(name, ingredients, preparation, id);
    const newRecipe = await getRecipeByName(name);
    return {
      http: 201,
      message: { recipe: newRecipe },
    };
  } catch (error) {
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

const handleUpdateRecipeById = async (recipeId, token, bodyParams) => {
  if (!token) return errorJWTMissing;
  try {
    const { id, role } = jwt.verify(token, secret);
    const { authorId } = await getRecipeById(recipeId);
    if (!role === 'admin' || !id === authorId) return errorJWTInvalid;
    const { name, ingredients, preparation } = bodyParams;
    await updateRecipeById(recipeId, name, ingredients, preparation);
    const result = await getRecipeById(recipeId);
    return {
      http: 200,
      message: result,
    };
  } catch (error) {
    return errorJWTInvalid;
  }
};

const handleDeleteRecipeById = async (recipeId, token) => {
  if (!token) return errorJWTMissing;
  try {
    const { id, role } = jwt.verify(token, secret);
    const { authorId } = await getRecipeById(recipeId);
    if (!role === 'admin' || !id === authorId) return errorJWTInvalid;
    await deleteRecipeById(recipeId);
    return {
      http: 204,
      message: null,
    };
  } catch (error) {
    return errorJWTInvalid;
  }
};

const validateToken = async (paramId, token) => {
  if (!token) return errorJWTMissing;
  try {
    const { id, role } = jwt.verify(token, secret);
    const { authorId } = await getRecipeById(paramId);
    if (!role === 'admin' || !id === authorId) return errorJWTInvalid;
  } catch (error) {
    return errorJWTInvalid;
  }
}

const handleAddImage = async (id, filename) => {
  await addImage(id, filename);
  const message = await getRecipeById(id);
  return {
    http: 200,
    message,
  };
};

module.exports = {
  handleNewRecipe,
  handleRecipeById,
  handleUpdateRecipeById,
  handleDeleteRecipeById,
  validateToken,
  handleAddImage,
};
