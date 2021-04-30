/** @format */

const {
  SUCCESS,
  CREATED,
  INTERNAL,
  NOT_FOUND,
  CONTENT,
} = require('../CODE_ERROR');

const {
  createRecipes,
  getRecipes,
  getIdRecipes,
  upRecipes,
  deleteRecipes,
} = require('../services');

const E1 = { message: 'recipe not found' };

const E2 = 'recipe not found';

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    const create = await createRecipes(name, ingredients, preparation, id);
    return res.status(CREATED).json({ recipe: create });
  } catch (error) {
    return res.status(INTERNAL).json({ message: error.message });
  }
};

const recipesGet = async (_req, res) => {
  try {
    const recipes = await getRecipes();
    return res.status(SUCCESS).json(recipes);
  } catch (error) {
    return res.status(INTERNAL).json({ message: error.message });
  }
};

const recipesGetId = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getIdRecipes(id);
    return res.status(SUCCESS).json(recipe);
  } catch (error) {
    return res.status(NOT_FOUND).json(E1);
  }
};

const recipesUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId: ids } = req.user;
    const { name, ingredients, preparation } = req.body;
    const update = await upRecipes(id, name, ingredients, preparation, ids);
    return res.status(SUCCESS).json(update);
  } catch (error) {
    return res.status(NOT_FOUND).json(E2);
  }
};

const recipesDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecip = await deleteRecipes(id);
    return res.status(CONTENT).json(deleteRecip);
  } catch (error) {
    return res.status(NOT_FOUND).json({ E2 });
  }
};

module.exports = {
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
};
