const Recipe = require('../model/RecipeModel');

const NOT_CONTENT = 204;
const SUCCESS = 200;
const CREATED = 201;
const { NotFoundException } = require('../exception');

const createRecipeController = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const { _id: userId } = req.user;
        const newRecipe = await Recipe.createRecipe(name, ingredients, preparation, userId);
        if (!newRecipe) throw Error;

        res.status(CREATED).json({ recipe: newRecipe });
    } catch (err) {
        next(err);
        }
};

const getAllRecipesController = async (_req, res, next) => {
    try {
      const recipes = await Recipe.findAll();
      const result = recipes;
      return res.status(SUCCESS).json(result);
    } catch (err) {
      next(err);
    }
  };

  const getRecipeByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Recipe.findById(id);
      if (result !== null) return res.status(SUCCESS).json(result);
      throw new NotFoundException('recipeNotFound');
    } catch (err) {
      next(err);
    }
  };

  const updateRecipeController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { _id: userId } = req.user;
      const recipeUpdated = { ...req.body, userId };
      const result = await Recipe.updateRecipe(id, recipeUpdated);
      if (result !== null) return res.status(SUCCESS).json(result);
      throw new NotFoundException('recipeNotFound');
    } catch (err) {
      next(err);
    }
  };

  const deleteRecipeController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Recipe.excludeRecipe(id);
      if (result !== null) return res.status(NOT_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    updateRecipeController,
    deleteRecipeController,
};
