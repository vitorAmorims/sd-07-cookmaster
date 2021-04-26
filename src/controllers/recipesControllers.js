const multer = require('multer');
const {
  handleNewRecipe,
  handleRecipeById,
  handleUpdateRecipeById,
  handleDeleteRecipeById,
  handleAddImage,
  validateToken,
} = require('../services/recipesServices');
const { allRecipes } = require('../models/recipesModels');

const ERROR = 500;
const SUCCESS = 200;

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, _file, callback) => {
    const name = req.params.id;
    callback(null, `${name}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

const saveRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const { http, message } = await handleNewRecipe(name, ingredients, preparation, token);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const result = await allRecipes();
    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { http, message } = await handleRecipeById(id);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const bodyParams = req.body;
    const { http, message } = await handleUpdateRecipeById(id, token, bodyParams);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const { http, message } = await handleDeleteRecipeById(id, token);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const tokenResult = await validateToken(id, token);
  if (tokenResult) return res.status(tokenResult.http).json(tokenResult.message);
  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) return res.status(ERROR).send({ message: error });
    if (error) return res.status(ERROR).send({ message: error });
    const { filename } = req.file;
    const { http, message } = await handleAddImage(id, filename);
    return res.status(http).json(message);
  });
};

module.exports = {
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addImage,
};
