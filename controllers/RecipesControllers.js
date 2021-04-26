const { CREATED } = require('../config/httpCodes');
const { addRecipe: modelAddRecipe } = require('../models/RecipesModels');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    // source: https://github.com/tryber/sd-07-cookmaster/blob/felipe-nascimento-cookmaster/src/controllers/recipesController.js#L6

    const userId = res.locals.id;
    const result = await modelAddRecipe(name, ingredients, preparation, userId);
    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addRecipe,
};