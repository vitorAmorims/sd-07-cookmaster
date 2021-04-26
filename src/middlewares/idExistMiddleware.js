const { ObjectId } = require('mongodb');
const RecipeModel = require('../models/RecipeModel');

const idExistMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const NUMBER_CONDITION = 24;

  if (id.length !== NUMBER_CONDITION || !ObjectId.isValid(id)) {
    return res.status(404).send({ message: 'recipe not found' });
  }

  const recipe = await RecipeModel.findById(id);
  if (!recipe) return res.status(404).send({ message: 'recipe not found' });

  next();
};

module.exports = idExistMiddleware;
