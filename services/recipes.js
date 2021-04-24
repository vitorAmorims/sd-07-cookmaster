const recipes = require('../models/recipes');

const TWELVE = 12;
const TWENTYFOUR = 24;
const notFound = 'recipe not found';

function err(message) {
  return {
    success: false,
    err: message,
  };
}

function success(data) {
  return {
    success: true,
    data,
  };
}

const createRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return err('Invalid entries. Try again.');
  const newRecipe = await recipes.createRecipe(name, ingredients, preparation);

  return success({
    recipe: {
      name,
      ingredients,
      preparation,
      _id: newRecipe.insertedId,
    },
  });
};

const getRecipes = async () => {
  const result = await recipes.getRecipes();

  return result;
};

const getRecipeById = async (id) => {
  if (!id) return err(notFound);
  if (id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return err(notFound);
  }
  const recipeId = await recipes.getRecipeById(id);

  if (!recipeId) return err(notFound);
  const { name, ingredients, preparation } = recipeId;

  return success({
    _id: id,
    name,
    ingredients,
    preparation,
  });
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await recipes.updateRecipe(id, name, ingredients, preparation);

  return success({
    _id: updatedRecipe.insertedId,
    name,
    ingredients,
    preparation,
  });
};

const validateDeleteRecipe = async (id) => {
  if (!id) throw new Error(notFound);
  if (id.length !== TWELVE && id.length !== TWENTYFOUR) {
    throw new Error(notFound);
  }

  const recipe = await recipes.getRecipeById(id);
  if (!recipe) throw new Error(notFound);
  return recipe;
};

const deleteRecipe = async (id) => {
  let recipe;
  try {
    recipe = await validateDeleteRecipe(id);
  } catch (e) {
    return err(e.message);
  }

  const { deletedCount } = await recipes.deleteRecipe(id);
  if (!deletedCount) return err('recipe not deleted');
  return success(recipe);
};

const insertImage = async (id, image) => {
  const imageUrl = await recipes.insertImage(id, image);
  if (!imageUrl) return err('Ops, something go wrong');
  console.log('image', image);

  const { name, ingredients, preparation } = imageUrl;
  return success({
    _id: id,
    name,
    ingredients,
    preparation,
    image,
  });
};

const getImage = async (id) => {
  if (!id) return err(notFound);
  if (id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return err(notFound);
  }
  const image = await recipes.getImage(id);

  return success(image.image);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
  getImage,
};