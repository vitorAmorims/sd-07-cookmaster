const {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImg,
} = require('../models/recipesModels');

const STATUS204 = 204;
const STATUS201 = 201;
const STATUS200 = 200;
const STATUS500 = 500;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const result = await addRecipe(name, ingredients, preparation, _id);
    res.status(STATUS201).json({ recipe: result });
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await getAllRecipes();
    res.status(STATUS200).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getRecipeById(id);
    res.status(STATUS200).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await updateRecipe(id, name, ingredients, preparation);
    res.status(STATUS200).json(result.value);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRecipe(id);
    return res.status(STATUS204).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const addImg = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await insertImg(id, `localhost:3000/${req.file.path}`);
    res.status(STATUS200).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateById,
  deleteById,
  addImg,
};
