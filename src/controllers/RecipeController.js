const RecipeService = require('../services/RecipeService');
const { SUCCESS, CREATED, ERROR, NOT_FOUND, UNAUTHORIZED, NO_CONTENT } = require('./status');

const internalError = 'An internal error has occurred';
const notFound = 'recipe not found';

module.exports = {
  index: async (req, res) => {
    try {
      const recipes = await RecipeService.index();
      return res.status(SUCCESS).json(recipes);
    } catch {
      return res.status(ERROR).json({ message: internalError });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await RecipeService.get(id);

      if (!recipe) {
        return res.status(NOT_FOUND).json({ message: notFound });
      }

      return res.status(SUCCESS).json(recipe);
    } catch {
      return res.status(ERROR).json({ message: internalError });
    }
  },
  create: async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const { _id } = req.user;
      const recipe = await RecipeService.create(name, ingredients, preparation, _id);
      return res.status(CREATED).json({ recipe });
    } catch {
      return res.status(ERROR).json({ message: internalError });
    }
  },
  update: async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const { _id: userId, role } = req.user;

      const recipe = await RecipeService.get(req.params.id);
      if (!recipe) return res.status(NOT_FOUND).json({ message: notFound });

      if (recipe.userId !== userId && role !== 'admin') {
        return res.status(UNAUTHORIZED).json({ message: 'user not authorized' });
      }

      const updatedRecipe = await RecipeService.update(req.params.id, {
        name, ingredients, preparation,
      });
      return res.status(SUCCESS).json(updatedRecipe);
    } catch {
      return res.status(ERROR).json({ message: internalError });
    }
  },
  delete: async (req, res) => {
    try {
      const { _id: userId, role } = req.user;
      const recipe = await RecipeService.get(req.params.id);
      if (!recipe) return res.status(NOT_FOUND).json({ message: notFound });

      if (recipe.userId !== userId && role !== 'admin') {
        return res.status(UNAUTHORIZED).json({ message: 'user not authorized' });
      }

      await RecipeService.delete(req.params.id);
      return res.status(NO_CONTENT).json();
    } catch {
      return res.status(ERROR).json({ message: internalError });
    }
  },
  image: async (req, res) => {
    try {
      const { filename } = req.file;
      const recipe = await RecipeService.update(req.params.id, {
        image: `localhost:3000/images/${filename}`,
      });
      return res.status(SUCCESS).json(recipe);
    } catch {
      return res.status(ERROR).json({ message: internalError });
    }
  },
};
