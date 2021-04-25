const recipesService = require('../service/recipesService');

const { C_201, C_400, C_401, C_500 } = recipesService.statusHttp;

const createRecipe = async (req, res) => {
  // const { name, ingredients, preparation } = req.body;
  // const userId = {};
  try {
    const recipe = await recipesService.create(req);
    if (recipe.code400) {
      return res.status(C_400).send({ message: recipe.message });
    }
    if (recipe.code401) {
      return res.status(C_401).send({ message: recipe.message });
    }
    return res.status(C_201).send({ recipe });
  } catch (error) {
    console.error(error);
      return res
        .status(C_500)
        .json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
};