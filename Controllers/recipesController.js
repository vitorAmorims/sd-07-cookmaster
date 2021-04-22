const recipesService = require('../Services/recipesService');

const addStatus = 201;

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await recipesService.createRecipes(name, ingredients, preparation, userId);
    res.status(addStatus).json({ recipe: newRecipe });
  } catch (error) {
    console.error({ message: 'Erro no controller ' });
  }
};

module.exports = {
  createRecipes,
};