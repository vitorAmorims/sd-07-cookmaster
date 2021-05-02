const express = require('express');

const router = express.Router();

const service = require('../services/recipeService');
const recipeMiddleware = require('../middlewares/recipeMiddleware');
const recipeSchema = require('../schemas/recipeSchema');
const validateToken = require('../oauth/validateToken');

router.post('/recipes',
  recipeSchema, recipeMiddleware, validateToken,
  async (request, response) => {
    try {
      const { name, ingredients, preparation } = request.body;
      const { user: { _id } } = request;
    
      const objectRecipe = { name, ingredients, preparation };

      const resultRecipe = await service.createRecipe(objectRecipe);

      return response
        .status(201)
        .json({ recipe: { ...resultRecipe.recipe, userId: _id } });
    } catch (error) {
      return response.status(500).json({ message: 'Erro interno', error });
    }
  });

module.exports = router;