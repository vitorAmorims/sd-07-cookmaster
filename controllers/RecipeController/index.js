const { resolve } = require('path');
const Recipe = require('../../services/RecipeServices');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;

    const { code, message, result } = await Recipe.createRecipe(
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

const getAllRecipes = async (req, res) => {
  try {
    const { code, message, result } = await Recipe.getAllRecipes();

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

const getIdRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, message, result } = await Recipe.getIdRecipes(id);

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

const editRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipeEdited = { name, ingredients, preparation };
    const { id } = req.params;
    const { _id: userId, role } = req.user;

    const { code, message, result } = await Recipe.editRecipe(
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

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId, role } = req.user;

    const { code, message, result } = await Recipe.deleteRecipe(
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

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId, role } = req.user;
    const pathname = `images/${id}.jpeg`;

    const { code, message, result } = await Recipe.addImage(
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

    return res.status(200).sendFile(resolve(__dirname, '../images', file));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getIdRecipes,
  editRecipe,
  deleteRecipe,
  addImage,
  getImageFile,
};