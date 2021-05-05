const express = require('express');
const multer = require('multer');

const router = express.Router();

const service = require('../services/recipeService');
const recipeMiddleware = require('../middlewares/recipeMiddleware');
const recipeIdMiddleware = require('../middlewares/recipeIdMiddleware');
const recipeSchema = require('../schemas/recipeSchema');
const validateToken = require('../oauth/validateToken');

const recipeId = '/recipes/:id';

const storage = multer.diskStorage({
  destination: (_request, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (request, file, callback) => {
    const { id } = request.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

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

  router.get('/images/:id/', async (request, response) => {    
    const { id } = request.params;
    await service.getImage(id);
  });

  router.get('/recipes', async (request, response) => response
    .status(200).json(await service.getAllRecipes()));

  router.get(recipeId, recipeIdMiddleware, async (request, response) => {
    const { id } = request.params;
    response.status(200).json(await service.findRecipeById(id));
  });

  router.put(`${recipeId}/image`, validateToken, upload.single('image'),     
    async (request, response) => {      
      const { id } = request.params;
      const { filename } = request.file;
      response.status(200).json(await service.addImage(id, filename));
  });

  router.put(recipeId, validateToken, async (request, response) => {
    const { name, ingredients, preparation } = request.body;
      const { user: { _id } } = request;
      const { id } = request.params;
      const objectRecipe = { name, ingredients, preparation, userId: _id };
      
      return response.status(200)
        .json(await service.updateRecipe(id, objectRecipe));
  });

  router.delete(recipeId, 
    validateToken, async (request, response) => {
      const { id } = request.params;
      return response.status(204).json(await service.deleteRecipe(id));
    });

module.exports = router;