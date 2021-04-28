const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const recipeIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) return res.status(404).json({ message: 'recipe not found' });

  const findId = await recipesModel.getById(id);
  if (findId === null) return res.status(404).json({ message: 'recipe not found' });

  next();
};

module.exports = recipeIdMiddleware;