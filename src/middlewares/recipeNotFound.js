const { ObjectId } = require('mongodb');
const recipeModels = require('../models/recipeModels');

const validName = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  const recipe = await recipeModels.getRecipesById(id);

  if (recipe === null) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  next();
};

module.exports = validName;
