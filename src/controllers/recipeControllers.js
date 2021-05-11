const service = require('../services/recipeServices');

const jwtError = 'jwt malformed';
const authError = 'missing auth token';

const newRecipe = async (req, res, next) => {
  try {
    const addedRecipe = await service.newRecipe(req.body, req.headers.authorization);
    return res.status(201).json({ recipe: addedRecipe });
  } catch (e) {
    if (e.message === jwtError) {
      return res.status(401).json({ message: e.message });
    }
    req.error = e;
    next();
  }
};

const getAllRecipes = async (_req, res) => {
  const recipes = await service.getAll();
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await service.getById(req.params.id);
    return res.status(200).json(recipe);
  } catch (e) {
    if (e.message === 'recipe not found') {
      return res.status(404).json({ message: e.message });
    }
  }
};

const editRecipe = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const recipe = await service.editRecipe({ id, ...req.body }, token);
    return res.status(200).json(recipe);
  } catch (e) {
    if (e.message === authError || e.message === jwtError) {
      return res.status(401).json({ message: e.message });
    }
  }
};

const deleteRecipe = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    await service.deleteRecipe(id, token);
    return res.status(204).end();
  } catch (e) {
    if (e.message === authError || e.message === jwtError) {
      return res.status(401).json({ message: e.message });
    }
  }
};

const addImage = async (req, res) => {
  console.log('cai aq');
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const response = await service.addImage(id, token);
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    if (e.message === authError) {
      return res.status(401).json({ message: e.message });
    }
  }
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImage,
};
