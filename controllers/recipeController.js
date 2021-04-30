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
    const { _id: userId } = req.user;
    const create = await createRecipes(name, ingredients, preparation, userId);
    return res.status(CREATED).send({ recipe: create });
  } catch (error) {
    return res.status(INTERNAL).send({ message: error.message });
  }
};

const recipesGet = async (req, res) => {
  try {
    const recipes = await getRecipes();
    return res.status(SUCCESS).send(recipes);
  } catch (error) {
    return res.status(INTERNAL).send({ message: error.message });
  }
};

const recipesGetId = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getIdRecipes(id);
    return res.status(SUCCESS).send(recipe);
  } catch (error) {
    return res.status(NOT_FOUND).send(E1);
  }
};

const recipesUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const update = await upRecipes(id, name, ingredients, preparation);
    return res.status(SUCCESS).send(update);
  } catch (error) {
    return res.status(NOT_FOUND).send(E2);
  }
};

const recipesDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecip = await deleteRecipes(id);
    return res.status(CONTENT).send(deleteRecip);
  } catch (error) {
    return res.status(NOT_FOUND).send(E2);
  }
};

module.exports = {
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
};
