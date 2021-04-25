const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddleware');
const {
  nameVerify,
  ingredientsVerify,
  preparationVerify,
} = require('../middlewares/BodyMiddlewares');
const recipesService = require('../services/RecipesService');
const { CREATED, INTERNAL_SERVER_ERROR, OK, NOT_FOUND } = require('../helpers/HttpStatusCodes');

const router = express.Router();

router.post('/',
authMiddleware,
nameVerify,
ingredientsVerify,
preparationVerify,
async (req, res) => {
  const recipe = req.body;
  const { _id: userId } = req.userLogin;
  try {
    const createdRecipe = await recipesService.create(recipe, userId);
    res.status(CREATED).json({ recipe: createdRecipe });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server Error' });
  }
});

router.put('/:id',
authMiddleware,
nameVerify,
ingredientsVerify,
preparationVerify,
async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const { userLogin } = req;
  try {
    const recipeUpdated = await recipesService.update(id, userLogin, recipe);
    res.status(OK).json(recipeUpdated);    
  } catch (error) {
    res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipesService.getById(id);
    res.status(OK).json(recipe);    
  } catch (error) {
    res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
});

router.get('/', async (_req, res) => {
  const recipes = await recipesService.getAll();
  res.status(OK).json(recipes);
});

module.exports = router;