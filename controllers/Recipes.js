const Recipe = require('../service/Recipes');

async function getRecipes(req, res) {
  const recipes = await Recipe.getRecipes();
  if (recipes.status === 'error') {
    return res.status(recipes.code).json({ message: recipes.message });
  }

  res.status(200).json(recipes);
}

async function getRecipeById(req, res) {
  const { id } = req.params;

  const recipe = await Recipe.getRecipeById(id);

  if (recipe.status === 'error') {
    return res.status(recipe.code).json({ message: recipe.message });
  }

  res.status(200).json(recipe);
}

async function createRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.user;

  const recipe = await Recipe.createRecipe(name, ingredients, preparation, id);

  if (recipe.status === 'error') {
    return res.status(recipe.code).json({ message: recipe.message });
  }

  res.status(201).json(recipe);
}

async function editRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { id: userId, role: userRole } = req.user;
  const { id } = req.params;

  const recipe = await Recipe.editRecipe(
    { id, name, ingredients, preparation },
    { userId, userRole },
  );

  if (recipe.status === 'error') {
    return res.status(recipe.code).json({ message: recipe.message });
  }

  res.status(200).json(recipe);
}

async function deleteRecipe(req, res) {
  const { id: userId, role: userRole } = req.user;
  const { id } = req.params;

  const result = await Recipe.deleteRecipe(id, userId, userRole);

  if (result.status === 'error') {
    return res.status(result.code).json({ message: result.message });
  }

  res.status(204).send();
}

async function addImage(req, res) {
  const { id: userId, role: userRole } = req.user;
  const { filename } = req.file;
  const { id } = req.params;

  const recipe = await Recipe.addImage(id, filename, { userId, userRole });

  if (recipe.status === 'error') {
    return res.status(recipe.code).json({ message: recipe.message });
  }

  res.status(200).json(recipe);
}

module.exports = {
  getRecipeById,
  getRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
};
