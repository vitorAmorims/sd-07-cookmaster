const { validIngredients, validName, validPreparation } = require('../helpers');

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

module.exports = dataRecipeInsertCheck;
