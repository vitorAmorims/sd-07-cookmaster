const RecipeService = require('../services/RecipeService');
const { SUCCESS, CREATED, ERROR, NOT_FOUND } = require('./status');

const internalError = 'An internal error has occurred';

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
        return res.status(NOT_FOUND).json({ message: 'recipe not found' });
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
};
