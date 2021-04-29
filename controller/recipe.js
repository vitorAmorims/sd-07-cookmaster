const path = require('path');
const Recipe = require('../service/recipe');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.data;

    const { code, message, result } = await Recipe.addRecipe(
      name, ingredients, preparation, userId,
    );

    if (!result) {
      return res.status(code).json({
        message,
      });
    }

    return res.status(code).json({ recipe: result });
  } catch (err) {
    console.log(err);
  }
};

const getRecipes = async (req, res) => {
  try {
    const { code, message, result } = await Recipe.getRecipes();

    if (!result) {
      return res.status(code).json({
        message,
      });
    }

    return res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, message, result } = await Recipe.getRecipeById(id);

    if (!result) {
      return res.status(code).json({
        message,
      });
    }

    return res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const editRecipeById = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipeEdited = { name, ingredients, preparation };
    const { id } = req.params;
    const { _id: userId, role } = req.data;

    const { code, message, result } = await Recipe.editRecipeById(
      recipeEdited, userId, role, id,
);
    if (!result) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId, role } = req.data;

    const { code, message, result } = await Recipe.deleteRecipeById(
      userId,
      role,
      id,
    );
    if (!result) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const uploadRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId, role } = req.data;
    const pathname = req.file.path;

    const { code, message, result } = await Recipe.uploadRecipeImage(
      userId, role, id, pathname,
);
    if (!result) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getImageFile = async (req, res) => {
  try {
    const { file } = req.params;

    return res.status(200).sendFile(path.join(__dirname, '../images', file));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadRecipeImage,
  getImageFile,
};
