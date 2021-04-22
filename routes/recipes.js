const express = require('express');

const router = express.Router();

const {
    getAllRecipes,
    getRecipesById,
    postRecipe,
    putRecipe,
    deleteRecipe,
  } = require('../controllers/recipes');

const midvalidateToken = require('../middlewares/doneToken');


  router.get('/', getAllRecipes);

  router.get('/:id', getRecipesById);
  
  router.post('/', midvalidateToken, postRecipe);
  
  router.put('/:id', midvalidateToken, putRecipe);
  
  router.delete('/:id', midvalidateToken, deleteRecipe);
  
  module.exports = router;