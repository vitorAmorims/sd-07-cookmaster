const Recipe = require('../models/Recipe');
const { createErrorMessage } = require('../helpers/createMessage');
const {
  validateCreateRecipe, validateGetRecipeById, validateEditRecipe, validateDeleteRecipe,
} = require('../helpers/paramsValidations');
const {
  RECIPE_NOT_FOUND, NOT_ALLOWED,
} = require('../helpers/errorMessages');

const SERVER_DOMAIN = 'localhost';
const PORT = 3000;

const addImageAndGetUpdatedRecipe = async (id, image, recipe, user) => {
  const { userRole } = user;

  if (
    userRole === 'admin'
    || (userRole === 'user' && recipe.userId === user.userId)
  ) {
    await Recipe.addImage(id, image);
    return Recipe.getRecipeById(id);
  }

  return createErrorMessage(403, NOT_ALLOWED);
};

const deleteRecipeHelper = async (currentRecipe, id, userId, userRole) => {
  if (
    userRole === 'admin'
    || (userRole === 'user' && currentRecipe.userId === userId)
  ) return Recipe.deleteRecipe(id);

  return createErrorMessage(403, NOT_ALLOWED);
};

const updateAndGetNewRecipe = async (currentRecipe, newRecipe, user) => {
  const { id, name, ingredients, preparation } = newRecipe;
  const { userId, userRole } = user;

  if (
    userRole === 'admin'
    || (userRole === 'user' && currentRecipe.userId === userId)
  ) {
    await Recipe.editRecipe(id, name, ingredients, preparation);
    return Recipe.getRecipeById(id);
  }

  return createErrorMessage(403, NOT_ALLOWED);
};

async function getRecipes() {
  try {
    const recipes = await Recipe.getRecipes();

    return recipes;
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

async function getRecipeById(id) {
  const validationResult = validateGetRecipeById(id);

  if (validationResult.status === 'error') return validationResult;

  try {
    const recipe = await Recipe.getRecipeById(id);

    if (!recipe) return createErrorMessage(404, RECIPE_NOT_FOUND);

    return recipe;
  } catch (error) {
    if (error.message.includes('Argument passed in must be a single String')) {
      return createErrorMessage(404, RECIPE_NOT_FOUND);
    }
    return createErrorMessage(500, error);
  }
}

async function createRecipe(name, ingredients, preparation, userId) {
  const validationResult = validateCreateRecipe(name, ingredients, preparation);

  if (validationResult.status === 'error') return validationResult;

  try {
    const recipe = await Recipe.createRecipe(name, ingredients, preparation, userId);

    return { recipe };
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

async function editRecipe(recipe, user) {
  const { id, name, ingredients, preparation } = recipe;

  const validationResult = validateEditRecipe(id, name, ingredients, preparation);

  if (validationResult.status === 'error') return validationResult;

  const foundRecipe = await Recipe.getRecipeById(id);

  if (!foundRecipe) return createErrorMessage(404, RECIPE_NOT_FOUND);

  try {
    return await updateAndGetNewRecipe(foundRecipe, recipe, user);
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

async function deleteRecipe(id, userId, userRole) {
  const validationResult = validateDeleteRecipe(id, userId, userRole);

  if (validationResult.status === 'error') return validationResult;

  try {
    const foundRecipe = await Recipe.getRecipeById(id);

    if (!foundRecipe) return createErrorMessage(404, RECIPE_NOT_FOUND);

    try {
      return await deleteRecipeHelper(foundRecipe, id, userId, userRole);
    } catch (error) {
      return createErrorMessage(500, error);
    }
  } catch (error) {
    return createErrorMessage(404, RECIPE_NOT_FOUND);
  }
}

async function addImage(id, filename, user) {
  const foundRecipe = await Recipe.getRecipeById(id);

  if (!foundRecipe) return createErrorMessage(404, RECIPE_NOT_FOUND);

  const imagePath = `${SERVER_DOMAIN}:${PORT}/images/${filename}`;

  try {
    const recipe = addImageAndGetUpdatedRecipe(id, imagePath, foundRecipe, user);

    return recipe;
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

module.exports = {
  getRecipeById,
  getRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
};
