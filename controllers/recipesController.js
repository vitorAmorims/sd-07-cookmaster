const recipesService = require('../service/recipesService');

const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE = 422;
const ERRO = 'Não entrou no controller!';
const NO_CONTENT = 204;

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
    console.error({ message: ERRO });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    return res.status(STATUS_OK).json(recipes);
  } catch (error) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: ERRO });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipe(id);
    console.log(recipe);
    return res.status(STATUS_OK).json(recipe);
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: ERRO });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.updateRecipe(id, req.body);
    console.log(recipe);
    return res.status(STATUS_OK).json(recipe.value);
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: ERRO });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await recipesService.deleteRecipe(id);
    return res.status(NO_CONTENT).json();
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: ERRO });
  }
};

const insertImageRecipe = async (req, res) => {
  try {
    if (req.exist) {
    const { path } = req.file;
    const { id } = req.params;
    console.log('dasdasdasda', id, path);
    const image = await recipesService.insertImageRecipe(
      id,
      `localhost:3000/${path}`,
    );
    return res.status(200).json({ image });
    }
    return res.status(404).json({ ERRO });
  } catch (error) {
    return res.status(404).json({ ERRO });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  insertImageRecipe,
};
