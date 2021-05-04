const express = require('express');

const router = express.Router();

const service = require('../services/recipeService');
const recipeMiddleware = require('../middlewares/recipeMiddleware');
const recipeIdMiddleware = require('../middlewares/recipeIdMiddleware');
const recipeSchema = require('../schemas/recipeSchema');
const validateToken = require('../oauth/validateToken');

router.post('/recipes',
  recipeSchema, recipeMiddleware, validateToken,
  async (request, response) => {
    try {
      const { name, ingredients, preparation } = request.body;
      const { user: { _id } } = request;
    
      const objectRecipe = { name, ingredients, preparation, userId: _id };

      const resultRecipe = await service.createRecipe(objectRecipe);

      return response
        .status(201)
        .json(resultRecipe);
    } catch (error) {
      return response.status(500).json({ message: 'Erro interno', error });
    }
  });

  router.get('/recipes', async (request, response) => response
    .status(200).json(await service.getAllRecipes()));

  router.get('/recipes/:id', recipeIdMiddleware, async (request, response) => {
    const { id } = request.params;
    response.status(200).json(await service.findRecipeById(id));
  });

  router.put('/recipes/:id', validateToken, async (request, response) => {
    const { name, ingredients, preparation } = request.body;
      const { user: { _id } } = request;
      const { id } = request.params;
      const objectRecipe = { name, ingredients, preparation, userId: _id };
      response.status(200).json(await service.updateRecipe(id, objectRecipe));
  });

module.exports = router;