const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddleware');
const {
  nameVerify,
  ingredientsVerify,
  preparationVerify,
} = require('../middlewares/BodyMiddlewares');
const recipesService = require('../services/RecipesService');
const { CREATED, INTERNAL_SERVER_ERROR } = require('../helpers/HttpStatusCodes');

const router = express.Router();

router.post('/',
  authMiddleware,
  nameVerify,
  ingredientsVerify,
  preparationVerify,
  async (req, res) => {
  const recipe = req.body;
  const { userId } = req;
  try {
    const createdRecipe = await recipesService.create(recipe, userId);
    res.status(CREATED).json({ recipe: createdRecipe });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server Error' });
  }    
});

module.exports = router;