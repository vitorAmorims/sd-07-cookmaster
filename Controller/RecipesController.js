const modelRecipes = require('../Model/RecipesModel');
const serviceRecipes = require('../Service/RecipesService');
const codes = require('./Status');

const createRecipe = async (req, res) => {
  const { _id } = req.user;
  try {
    const { name, ingredients, preparation } = req.body;
    const result = await serviceRecipes.createRecipe(
      _id,
      name,
      ingredients,
      preparation,
    );
    return res.status(codes.CREATE).json({ recipe: result });
  } catch (error) {
    console.error(error);

    const { message } = error;
    res.status(codes.ERROR).json({ message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const data = await serviceRecipes.getAllRecipes();
    return res.status(codes.OK).json(data);
  } catch (error) {
    console.error(error);
    return res.status(codes.ERROR).json({ message: error.message });
  }
};

const getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await modelRecipes.getRecipesById(id);
    if (!data) {
      const ERR_MESSAGE = 'recipe not found';
      throw new Error(ERR_MESSAGE);
    }
    return res.status(codes.OK).json(data);
  } catch (error) {
    let { message } = error;
    if (message.includes('Argument passed in must be a single String')) {
      message = 'recipe not found';
      return res.status(codes.ERRORBYID).json({ message });
    }
    return res.status(codes.ERRORBYID).json({ message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await modelRecipes.getRecipesById(id);
    const { userId, _id: idRecipe } = recipe;
    if (String(userId) === String(_id)
      || String(req.user.role) === 'admin') {
      const objParams = { _id, idRecipe, name, ingredients, preparation };
      const data = await serviceRecipes.updateRecipe(objParams);
      return res.status(codes.OK).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(codes.ERRORUPDATE).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const recipe = await modelRecipes.getRecipesById(id);
    const { userId } = recipe;
    if (String(userId) === String(_id)
      || String(req.user.role) === 'admin') {
      const data = await serviceRecipes.deleteRecipe(id);
      return res.status(codes.DELETEOK).json(data);
    }
  } catch (error) {
    console.log(error);
    const { message } = error;
    return res.status(codes.ERRORUPDATE).json({ message });
  }
};

const addImgRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const img = req.file;
  try {
    const recipe = await modelRecipes.getRecipesById(id);
    const { userId } = recipe;
    if (String(userId) === String(_id) || String(req.user.role) === 'admin') {
      const image = `localhost:3000/images/${img.filename}`;
      const objParams = { ...recipe, image };
      const result = await serviceRecipes.insertImageRecipe(objParams);
      return res.status(codes.OK).json(result);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  addImgRecipe,
};