const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, user } = req.body;
    const createdRecipe = await recipesService.createRecipes(
      name,
      ingredients,
      preparation,
      user,
    );
    console.log(createdRecipe);
    const { http, message } = createdRecipe;
    res.status(http).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno', err: error.message });
  }
};

module.exports = {
  createRecipe,
};
