const recipesService = require('../services/recipesService');

const STATUS_BAD_REQUEST = 400;
const STATUS_CREATED = 201;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await recipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ recipe: result });
  }
};

module.exports = { createRecipe };
