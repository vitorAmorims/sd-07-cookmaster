const express = require('express');
const multer = require('multer');
const {
  errorMiddleware,
  checkEntries,
  checkRecipeId,
  checkOwnership,
} = require('../middleware');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImage,
} = require('../models/recipes');
const { authorizeToken } = require('../services/auth');

const app = express();

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, 'images/');
  },
  filename: (request, _file, callback) => {
    callback(null, `${request.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const OK = 200;
const CREATED = 201;
const INTERNAL_ERROR = 500;

const recipeIdPath = '/recipes/:id';

app.get('/recipes', async (request, response) => {
  try {
    const result = await getAllRecipes();
    response.status(OK).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.get(recipeIdPath, checkRecipeId, async (request, response) => {
  const { id } = request.params;

  try {
    const result = await getRecipeById(id);
    response.status(OK).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.post('/recipes', checkEntries, authorizeToken, async (err, request, response, next) => {
  if (err.status !== 200) return next(err);
  const { _id } = err;
  const recipe = request.body;

  try {
    const result = await createRecipe({ userId: _id, ...recipe });
    response.status(CREATED).send({ recipe: result });
  } catch (error) {
    response.status(INTERNAL_ERROR).send({ message: error.message });
  }
});

app.put(recipeIdPath,
  checkRecipeId,
  checkEntries,
  authorizeToken,
  checkOwnership,
  async (request, response) => {
  const { id } = request.params;
  const recipe = request.body;

  try {
    const result = await updateRecipe(id, recipe);
    response.status(OK).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.put('/recipes/:id/image',
  checkRecipeId,
  authorizeToken,
  checkOwnership,
  upload.single('image'),
  async (request, response) => {
  const { id } = request.params;
  const { filename } = request.file;

  try {
    const result = await addImage(id, filename);
    response.status(OK).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.delete(recipeIdPath,
  checkRecipeId,
  authorizeToken,
  checkOwnership,
  async (request, response) => {
  const { id } = request.params;

  try {
    const result = await deleteRecipe(id);
    response.status(204).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.use(errorMiddleware);

module.exports = app;
