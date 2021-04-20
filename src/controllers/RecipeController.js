const RecipeService = require('../services/RecipeService');
const { SUCCESS, CREATED, ERROR } = require('./status');

module.exports = {
  index: async (req, res) => {
    try {
      const recipes = await RecipeService.index();
      return res.status(SUCCESS).json(recipes);
    } catch {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
  create: async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const { _id } = req.user;
      const recipe = await RecipeService.create(name, ingredients, preparation, _id);
      return res.status(CREATED).json({ recipe });
    } catch {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
