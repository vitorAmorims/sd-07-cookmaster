const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;

    const recipes = await recipesService.createRecipes(name, ingredients, preparation);
    console.log('recipes service', recipes);
    if (recipes.erro) {
      return res.status(recipes.erro.status).json({ message: recipes.erro.message });
    }
    return res.status(201)
      .json({ recipe: { name, ingredients, preparation, _id: recipes.insertedId } });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createRecipes,
};
