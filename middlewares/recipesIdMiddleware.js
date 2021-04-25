const recipesModel = require('../models/recipesModel');

const invalidId = { message: 'recipe not found' };

const recipesIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesModel.getRecipeById(id);

  if (recipe === null) {
      return res.status(404).json(invalidId);
  }
  next();
};

module.exports = recipesIdMiddleware;
