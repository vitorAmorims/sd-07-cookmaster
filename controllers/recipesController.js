const recipesService = require('../service/recipesService');

const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE = 422;

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation, id } = req.body;
    const recipes = await recipesService.createRecipes(
      name,
      ingredients,
      preparation,
      id,
    );
    return res.status(STATUS_CREATED).json({ recipe: recipes.ops[0] });
  } catch (error) {
    console.error({ message: 'Não entrou no controller!' });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    return res.status(STATUS_OK).json(recipes);
  } catch (error) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller!' });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipe(id);
    console.log(recipe);
    return res.status(STATUS_OK).json(recipe);
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.updateRecipe(id, req.body);
    console.log(recipe);
    return res.status(STATUS_OK).json(recipe.value);
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};
module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
  updateRecipe,
};
