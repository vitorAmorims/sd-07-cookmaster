const { ObjectId } = require('mongodb');
const { validIngredients, validName, validPreparation } = require('../helpers');
const { status } = require('../helpers');

const dataRecipeInsertCheck = async (req, res, next) => {
  const { body: { name, ingredients, preparation } } = req;
  try {
    validName(name);
    validIngredients(ingredients);
    validPreparation(preparation);
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

const idExistCheck = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    if (!ObjectId.isValid(id) || !id) throw status.notFound;
    next();
  } catch (error) {
    return res.status(error.code).json({ message: 'recipe not found' });
  }
};

module.exports = { dataRecipeInsertCheck, idExistCheck };
