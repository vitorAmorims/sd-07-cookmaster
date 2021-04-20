const RecipeService = require('../services/RecipeService');
const { CREATED, ERROR } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const { _id } = req.user;
      const recipe = await RecipeService.create(name, ingredients, preparation, _id);
      return res.status(CREATED).json({ recipe });
    } catch (error) {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
