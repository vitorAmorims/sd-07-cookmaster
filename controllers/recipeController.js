const { Router } = require('express');
const multer = require('multer');
const { status, errorMessages } = require('../helpers');
const { authMiddleware } = require('../middlewares');

const { recipeService } = require('../services');

const recipeRoute = Router();

recipeRoute.get('/', async (_req, res) => {
  try {
    const result = await recipeService.getAllRecipesService();
    return res.status(status.SUCCESS).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

recipeRoute.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await recipeService.getRecipeByIdService(id);
    if (result.isError) return next(result);
    return res.status(status.SUCCESS).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

recipeRoute.post('/', authMiddleware, async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;

  try {
    if (!name || !ingredients || !preparation) return next(errorMessages.INVALID_ENTRIES);

    const result = await recipeService.validRecipeService(name, ingredients, preparation, user);
    return res.status(status.CREATED).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

recipeRoute.put('/:id', authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const data = req.body;
  try {
    const result = await recipeService.updateRecipeByIdService(id, data, user);
    if (result.isError) return next(result);
    const newRecipe = { _id: id, ...data };
    return res.status(status.SUCCESS).json(newRecipe);
  } catch (err) {
    throw new Error(err);
  }
});

recipeRoute.delete('/:id', authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const result = await recipeService.deleteRecipeByIdService(id, user);
    if (result.isError) return next(result);
    return res.status(status.NO_CONTENT).json();
  } catch (err) {
    throw new Error(err);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'uploads'); },
  filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage });
// const newUpload = upload.single('image');

recipeRoute.post('/:id/image', authMiddleware, upload.single('image'), async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const teste = req.file;
  console.log('teste', teste);
  try {
    const result = await recipeService.insertImageRecipeByIdService(id, user);
    if (result.isError) return next(result);
    return res.status(status.SUCCESS).json();
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = recipeRoute;
