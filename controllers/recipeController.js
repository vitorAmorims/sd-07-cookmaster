const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  await recipeService.createRecipe(name, ingredients, preparation);

  res.status(201).json({
    recipe: {
      name,
      ingredients,
      preparation,
    },
  });
};

module.exports = {
  createRecipe,
};
