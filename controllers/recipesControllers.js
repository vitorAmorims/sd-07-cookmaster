const recipeService = require('../services/recipeService');
const errors = require('../errors');

async function addNewRecipe(req, res) {
  const responseOK = 201;
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    if (!name || !ingredients || !preparation) throw errors.invalidEntries;
    const recipe = await recipeService.addRecipe(
      name,
      ingredients,
      preparation,
      id,
    );
    res.status(responseOK).json({ recipe });
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
}

async function getAllRecipes(req, res) {
  const responseOK = 200;
  try {
    const AllRecipes = await recipeService.getRecipes();
    res.status(responseOK).json(AllRecipes);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function getRecipesById(req, res) {
  const responseOK = 200;
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    res.status(responseOK).json(recipe);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
}

async function changeRecipes(req, res) {
  const responseOK = 200;
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userID } = req.user;
    const recipeToChange = { id, name, ingredients, preparation, userID };
    const recipe = await recipeService.updateRecipe(recipeToChange);
    res.status(responseOK).json(recipe);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
}

async function deleteRecipe(req, res) {
  const responseOK = 204;
  try {
    const { id } = req.params;
    const { _id: userID } = req.user;
    await recipeService.removeRecipe(id, userID);
    res.status(responseOK).end();
  } catch (err) {
    res.status(err.code || 401).json({
      message: err.message,
    });
  }
}

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getRecipesById,
  changeRecipes,
  deleteRecipe,
};
